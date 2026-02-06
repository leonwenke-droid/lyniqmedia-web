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

  /* Demo Voice Agent – n8n Webhook */
  var demoForm = document.getElementById('demo-voice-form');
  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = demoForm.querySelector('input[name="phone"]');
      var submitBtn = demoForm.querySelector('.demo-form-submit');
      var phone = input && input.value ? input.value.trim() : '';
      var webhookUrl = demoForm.getAttribute('data-n8n-webhook') || '';

      if (!phone) {
        if (submitBtn) submitBtn.textContent = 'Bitte Nummer eingeben';
        setTimeout(function () {
          if (submitBtn) submitBtn.textContent = 'Absenden';
        }, 2000);
        return;
      }

      if (!webhookUrl) {
        if (submitBtn) submitBtn.textContent = 'Webhook nicht konfiguriert';
        setTimeout(function () {
          if (submitBtn) submitBtn.textContent = 'Absenden';
        }, 2500);
        return;
      }

      var originalText = submitBtn ? submitBtn.textContent : 'Absenden';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet…';
      }

      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone })
      })
        .then(function (res) {
          if (res.ok) {
            if (submitBtn) submitBtn.textContent = 'Erfolgreich gesendet!';
            if (input) input.value = '';
          } else {
            if (submitBtn) submitBtn.textContent = 'Fehler – bitte erneut versuchen';
          }
        })
        .catch(function () {
          if (submitBtn) submitBtn.textContent = 'Fehler – bitte erneut versuchen';
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            setTimeout(function () {
              submitBtn.textContent = originalText;
            }, 3000);
          }
        });
    });
  }

  /* Contact form – n8n Webhook */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.btn-submit');
      var webhookUrl = contactForm.getAttribute('data-n8n-webhook') || '';
      var vorname = (contactForm.querySelector('[name="vorname"]') || {}).value || '';
      var nachname = (contactForm.querySelector('[name="nachname"]') || {}).value || '';
      var unternehmen = (contactForm.querySelector('[name="unternehmen"]') || {}).value || '';
      var email = (contactForm.querySelector('[name="email"]') || {}).value || '';
      var nachricht = (contactForm.querySelector('[name="nachricht"]') || {}).value || '';

      var originalText = btn ? btn.textContent : 'Nachricht senden';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Wird gesendet…';
      }

      if (!webhookUrl) {
        if (btn) {
          btn.textContent = 'Webhook nicht konfiguriert';
          setTimeout(function () {
            btn.disabled = false;
            btn.textContent = originalText;
          }, 2500);
        }
        return;
      }

      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vorname: vorname.trim(),
          nachname: nachname.trim(),
          unternehmen: unternehmen.trim(),
          email: email.trim(),
          nachricht: nachricht.trim()
        })
      })
        .then(function (res) {
          if (res.ok) {
            if (btn) btn.textContent = 'Nachricht gesendet';
            contactForm.reset();
          } else {
            if (btn) btn.textContent = 'Fehler – bitte erneut versuchen';
          }
        })
        .catch(function () {
          if (btn) btn.textContent = 'Fehler – bitte erneut versuchen';
        })
        .finally(function () {
          if (btn) {
            btn.disabled = false;
            setTimeout(function () {
              btn.textContent = originalText;
            }, 3000);
          }
        });
    });
  }

  /* KI-Chatbot Widget */
  (function initChatbot() {
    var chatbotWidget = document.getElementById('chatbot-widget');
    var chatbotToggle = document.getElementById('chatbot-toggle');
    var chatbotWindow = document.getElementById('chatbot-window');
    var chatbotClose = document.getElementById('chatbot-close');
    var chatbotForm = document.getElementById('chatbot-form');
    var chatbotInput = document.getElementById('chatbot-input');
    var chatbotMessages = document.getElementById('chatbot-messages');
    var chatbotTyping = document.getElementById('chatbot-typing');
    var chatbotSend = chatbotForm.querySelector('.chatbot-send');

    if (!chatbotWidget || !chatbotToggle || !chatbotWindow) return;

    var webhookUrl = chatbotWidget.getAttribute('data-n8n-webhook') || '';
    var isOpen = false;
    var messageHistory = [];

    // Toggle Chat Window
    function toggleChat() {
      isOpen = !isOpen;
      chatbotWidget.classList.toggle('is-open', isOpen);
      chatbotToggle.setAttribute('aria-expanded', isOpen);
      chatbotWindow.setAttribute('aria-hidden', !isOpen);
      
      if (isOpen) {
        chatbotInput.focus();
        // Scroll to bottom when opening
        setTimeout(function() {
          scrollToBottom();
        }, 100);
      }
    }

    chatbotToggle.addEventListener('click', toggleChat);
    chatbotClose.addEventListener('click', toggleChat);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        toggleChat();
      }
    });

    // Add message to chat
    function addMessage(text, isUser) {
      var messageDiv = document.createElement('div');
      messageDiv.className = 'chatbot-message chatbot-message--' + (isUser ? 'user' : 'bot');
      
      if (!isUser) {
        var avatar = document.createElement('div');
        avatar.className = 'chatbot-message-avatar';
        avatar.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
        messageDiv.appendChild(avatar);
      }

      var content = document.createElement('div');
      content.className = 'chatbot-message-content';
      var p = document.createElement('p');
      p.textContent = text;
      content.appendChild(p);
      messageDiv.appendChild(content);

      chatbotMessages.appendChild(messageDiv);
      scrollToBottom();
      
      return messageDiv;
    }

    // Show typing indicator
    function showTyping() {
      chatbotTyping.classList.add('is-visible');
      scrollToBottom();
    }

    function hideTyping() {
      chatbotTyping.classList.remove('is-visible');
    }

    // Scroll to bottom
    function scrollToBottom() {
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Send message to n8n
    function sendMessage(text) {
      if (!text.trim() || !webhookUrl) return;

      // Add user message
      addMessage(text, true);
      messageHistory.push({ role: 'user', content: text });
      chatbotInput.value = '';
      chatbotSend.disabled = true;

      // Show typing indicator
      showTyping();

      // Send to n8n webhook
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messageHistory.slice(-10) // Last 10 messages for context
        })
      })
        .then(function(res) {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then(function(data) {
          hideTyping();
          
          // Handle response (adjust based on your n8n response format)
          var responseText = data.response || data.message || data.text || 'Entschuldigung, ich konnte Ihre Nachricht nicht verarbeiten.';
          
          // Add bot response
          addMessage(responseText, false);
          messageHistory.push({ role: 'assistant', content: responseText });
        })
        .catch(function(error) {
          hideTyping();
          console.error('Chatbot error:', error);
          addMessage('Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.', false);
        })
        .finally(function() {
          chatbotSend.disabled = false;
          chatbotInput.focus();
        });
    }

    // Form submit
    chatbotForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var text = chatbotInput.value.trim();
      if (text) {
        sendMessage(text);
      }
    });

    // Allow Enter to send (Shift+Enter for new line if needed)
    chatbotInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatbotForm.dispatchEvent(new Event('submit'));
      }
    });
  })();
})();
