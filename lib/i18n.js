const fs = require("fs");
const path = require("path");

const SUPPORTED_LOCALES = ["en", "el"];
const DEFAULT_LOCALE = "en";

const dictionaries = SUPPORTED_LOCALES.reduce((acc, locale) => {
  const file = path.join(__dirname, "..", "locales", `${locale}.json`);
  acc[locale] = JSON.parse(fs.readFileSync(file, "utf8"));
  return acc;
}, {});

function getByPath(obj, keyPath) {
  return keyPath.split(".").reduce((node, key) => (node && node[key] !== undefined ? node[key] : undefined), obj);
}

/**
 * Returns a `t(key, vars)` translator bound to `locale`, falling back to the
 * default locale (and finally the raw key) so a missing translation never
 * crashes a render.
 */
function createTranslator(locale) {
  const dict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
  const fallbackDict = dictionaries[DEFAULT_LOCALE];

  return function t(key, vars) {
    let value = getByPath(dict, key);
    if (value === undefined) value = getByPath(fallbackDict, key);
    if (value === undefined) return key;

    if (typeof value === "string" && vars) {
      return Object.keys(vars).reduce((str, varKey) => str.replace(`{${varKey}}`, vars[varKey]), value);
    }
    return value;
  };
}

function resolveLocale(candidate) {
  return SUPPORTED_LOCALES.includes(candidate) ? candidate : DEFAULT_LOCALE;
}

module.exports = { SUPPORTED_LOCALES, DEFAULT_LOCALE, createTranslator, resolveLocale };
