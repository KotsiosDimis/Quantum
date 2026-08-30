(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var toggle = document.getElementById("mobile-menu-toggle");
    var menu = document.getElementById("mobile-menu");
    var iconMenu = document.getElementById("icon-menu");
    var iconClose = document.getElementById("icon-close");
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
      menu.classList.toggle("hidden", !open);
      iconMenu.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
      if (open) {
        var firstLink = menu.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Classes carousel ---------- */
  function initCarousel() {
    var track = document.getElementById("carousel-track");
    if (!track) return;

    var slides = track.children;
    var prevBtn = document.getElementById("carousel-prev");
    var nextBtn = document.getElementById("carousel-next");
    var dots = document.querySelectorAll(".carousel-dot");
    var liveRegion = document.getElementById("carousel-live");
    var currentIndex = 0;
    var autoplayId = null;
    var isPointerDown = false;

    function announce(index) {
      var slide = slides[index];
      var heading = slide.querySelector("h3");
      if (liveRegion && heading) {
        liveRegion.textContent = heading.textContent;
      }
    }

    function updateControls(index) {
      dots.forEach(function (dot, i) {
        var active = i === index;
        dot.classList.toggle("bg-primary", active);
        dot.classList.toggle("bg-white/30", !active);
        dot.setAttribute("aria-selected", String(active));
      });
    }

    function goTo(index, opts) {
      var silent = opts && opts.silent;
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      track.scrollTo({
        left: slides[currentIndex].offsetLeft,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });

      updateControls(currentIndex);
      if (!silent) announce(currentIndex);
    }

    function startAutoplay() {
      if (prefersReducedMotion) return; // never auto-advance for reduced-motion users
      stopAutoplay();
      autoplayId = window.setInterval(function () {
        goTo(currentIndex + 1);
      }, 6000);
    }

    function stopAutoplay() {
      if (autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goTo(currentIndex - 1);
        startAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goTo(currentIndex + 1);
        startAutoplay();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
        startAutoplay();
      });
    });

    // Keyboard support when the carousel region has focus
    track.setAttribute("tabindex", "0");
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(currentIndex + 1);
        startAutoplay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentIndex - 1);
        startAutoplay();
      }
    });

    // Pause autoplay while the user interacts (hover, focus, touch/drag scroll)
    track.addEventListener("mouseenter", stopAutoplay);
    track.addEventListener("mouseleave", startAutoplay);
    track.addEventListener("focusin", stopAutoplay);
    track.addEventListener("focusout", startAutoplay);
    track.addEventListener("touchstart", function () { isPointerDown = true; stopAutoplay(); }, { passive: true });
    track.addEventListener("touchend", function () { isPointerDown = false; }, { passive: true });

    // Keep dots/live-region in sync when the user swipes/scrolls manually
    var scrollTimeout;
    track.addEventListener("scroll", function () {
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(function () {
        var newIndex = Math.round(track.scrollLeft / track.offsetWidth);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
          currentIndex = newIndex;
          updateControls(currentIndex);
          if (!isPointerDown) announce(currentIndex);
        }
      }, 120);
    });

    updateControls(0);
    startAutoplay();
  }


  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initCarousel();
  });
})();
