(function () {
  'use strict';

  /* Aktuelles Jahr im Footer */
  var yearEls = document.querySelectorAll('.current-year');
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = year;
  });

  /* Scroll-Reveal: Sektionen und Karten erscheinen beim Runterscrollen */
  (function initScrollReveal() {
    var sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    function isInViewport(el) {
      var rect = el.getBoundingClientRect();
      var margin = 80;
      return rect.top < window.innerHeight - margin;
    }

    function revealSection(section) {
      section.classList.add('is-visible');
    }

    /* Sektionen die schon im Viewport sind sofort sichtbar machen */
    sections.forEach(function (section) {
      if (isInViewport(section)) revealSection(section);
    });

    document.body.classList.add('scroll-reveal-ready');

    if (typeof IntersectionObserver === 'undefined') {
      sections.forEach(revealSection);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.05
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  })();

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('is-open'));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* FAQ Accordion */
  var faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('is-open');
      var allItems = document.querySelectorAll('.faq-item');
      allItems.forEach(function (i) {
        i.classList.remove('is-open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Contact form */
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.btn-submit');
      var originalText = btn.textContent;
      btn.textContent = 'Wird gesendet…';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = 'Nachricht gesendet';
        btn.disabled = false;
        contactForm.reset();
        setTimeout(function () {
          btn.textContent = originalText;
        }, 2500);
      }, 800);
    });
  }
})();
