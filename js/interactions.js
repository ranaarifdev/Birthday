(function () {
  function initializeInteractions() {
    const wishes = [
      'May Allah bless you with happiness, peace, and success.',
      'May your dreams find their way into beautiful reality.',
      'May every new day bring you a reason to smile.',
      'May kindness and genuine friendship always surround you.',
      'May your future be full of hope, growth, and lovely surprises.',
      'May you always remember how appreciated you are.'
    ];

    document.addEventListener('click', (event) => {
      const actionButton = event.target.closest('[data-action]');
      if (!actionButton) return;

      const action = actionButton.dataset.action;
      if (action === 'wish' || action === 'random-wish') {
        const output = actionButton.closest('.birthday-copy')?.querySelector('[data-wish-result]')
          || document.querySelector('[data-wish-result]');
        if (output) output.textContent = wishes[Math.floor(Math.random() * wishes.length)];
        window.BirthdayFX.burst(28);
        window.BirthdayFX.fireworks(4);
        window.BirthdayFX.hearts(window.innerWidth / 2, window.innerHeight / 2, 10);
      }

      if (action === 'open-letter') {
        const letter = document.querySelector('[data-letter]');
        const isOpen = actionButton.getAttribute('aria-expanded') === 'true';
        actionButton.setAttribute('aria-expanded', String(!isOpen));
        actionButton.textContent = isOpen ? 'Open the letter 💌' : 'Close the letter ✨';
        letter.classList.toggle('is-open', !isOpen);
        letter.setAttribute('aria-hidden', String(isOpen));
        if (!isOpen && !letter.querySelector('.falling-petal')) window.BirthdayFX.petals(letter, 12);
      }

      if (action === 'open-gift') {
        const box = document.querySelector('[data-gift-box]');
        const reveal = document.querySelector('[data-gift-reveal]');
        if (box.classList.contains('is-open')) return;
        box.classList.add('is-open');
        window.setTimeout(() => {
          reveal.classList.add('is-open');
          reveal.setAttribute('aria-hidden', 'false');
          window.BirthdayFX.burst(55);
          window.BirthdayFX.fireworks(6);
          window.BirthdayFX.hearts(window.innerWidth / 2, window.innerHeight / 2, 14);
        }, 520);
        actionButton.disabled = true;
        actionButton.textContent = 'Your surprise is open 💗';
      }

      if (action === 'secret') {
        const message = document.querySelector('[data-secret-result]');
        message.hidden = false;
        message.textContent = 'P.S. Your friendship is a little brightness in the world. Keep being wonderfully you! 💗';
        actionButton.hidden = true;
        window.BirthdayFX.hearts(actionButton.getBoundingClientRect().x, actionButton.getBoundingClientRect().y, 10);
      }

      if (action === 'replay') {
        window.location.href = 'index.html?replay=1';
      }
    });

    document.querySelectorAll('[data-compliment]').forEach((card) => {
      const reveal = () => {
        const isOpen = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', String(!isOpen));
        card.querySelector('.card-message').setAttribute('aria-hidden', String(isOpen));
        if (!isOpen) {
          const bounds = card.getBoundingClientRect();
          window.BirthdayFX.hearts(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2, 5);
        }
      };
      card.addEventListener('click', reveal);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          reveal();
        }
      });
    });

    const flowerArea = document.querySelector('[data-flower-garden]');
    if (flowerArea) window.BirthdayFX.petals(flowerArea, 15);

    if (document.body.dataset.page === 'finale') {
      window.setTimeout(() => window.BirthdayFX.burst(60), 550);
      window.setTimeout(() => window.BirthdayFX.fireworks(8), 800);
    }
  }

  if (document.body.classList.contains('is-locked')) {
    document.addEventListener('birthday:unlock', initializeInteractions, { once: true });
  } else {
    initializeInteractions();
  }
}());
