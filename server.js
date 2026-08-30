const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const siteConfig = require("./config/site.config");
const { SUPPORTED_LOCALES, DEFAULT_LOCALE, createTranslator, resolveLocale } = require("./lib/i18n");

const app = express();
const PORT = process.env.PORT || 3000;
const LOCALE_COOKIE = "lang";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
// Cache-busts /css and /js static assets once per process start, so browsers
// keep the 1-day cache within a deploy but always fetch fresh files after one.
const ASSET_VERSION = Date.now().toString(36);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"]
      }
    }
  })
);
app.use(compression());
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "30d",
    setHeaders(res, filePath) {
      // css/js are cache-busted via the `?v=` query param and fonts never
      // change without a filename change, so all three can cache "forever".
      if (/[/\\](css|js|fonts|images)[/\\]/.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    }
  })
);

// --- i18n: query param (?lang=el) beats cookie beats browser Accept-Language beats default ---
app.use((req, res, next) => {
  let locale = req.cookies[LOCALE_COOKIE];

  if (req.query.lang && SUPPORTED_LOCALES.includes(req.query.lang)) {
    locale = req.query.lang;
    res.cookie(LOCALE_COOKIE, locale, { maxAge: ONE_YEAR_MS, sameSite: "lax", httpOnly: false });
  }

  if (!locale) {
    const preferred = (req.acceptsLanguages(SUPPORTED_LOCALES) || DEFAULT_LOCALE);
    locale = preferred;
  }

  req.locale = resolveLocale(locale);
  res.locals.locale = req.locale;
  res.locals.t = createTranslator(req.locale);
  res.locals.otherLocale = req.locale === "en" ? "el" : "en";
  next();
});

app.use((req, res, next) => {
  res.locals.formatPrice = (amount) => `${amount}${siteConfig.currencySymbol}`;
  res.locals.assetVersion = ASSET_VERSION;
  next();
});

app.get("/", (req, res) => {
  res.render("index", { site: siteConfig });
});

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(PORT, () => {
  console.log(`Quantum Gym running at http://localhost:${PORT}`);
});
