(function () {
  'use strict';

  /* Aktuelles Jahr im Footer */
  var yearEls = document.querySelectorAll('.current-year');
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = year;
  });

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
