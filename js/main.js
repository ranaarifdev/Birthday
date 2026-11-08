(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lockScreen = document.querySelector('[data-birthday-lock]');
  const lockTitle = document.querySelector('#lock-title');
  const lockTeaser = document.querySelector('.lock-teaser');
  const lockCountdown = document.querySelector('[data-lock-countdown]');
  const unlockedMessage = document.querySelector('[data-lock-unlocked]');
  const lockLocalTimeNote = document.querySelector('.lock-timezone');
  const lockCopy = {
    title: lockTitle ? lockTitle.innerHTML : '',
    teaser: lockTeaser ? lockTeaser.textContent : ''
  };
  let gateOpen = false;
  let interactionsStarted = false;

  function birthdayTarget(year) {
    return new Date(year, 10, 9, 0, 0, 0, 0).getTime();
  }

  function updateBirthdayGate() {
    if (!lockScreen) return;
    const now = new Date();
    const target = birthdayTarget(now.getFullYear());
    const released = now.getTime() >= target;

    if (!released) {
      const remaining = target - now.getTime();
      const values = {
        days: Math.floor(remaining / 86400000),
        hours: Math.floor((remaining / 3600000) % 24),
        minutes: Math.floor((remaining / 60000) % 60),
        seconds: Math.floor((remaining / 1000) % 60)
      };
      Object.entries(values).forEach(([unit, value]) => {
        const output = lockScreen.querySelector(`[data-lock-${unit}]`);
        if (output) output.textContent = String(value).padStart(2, '0');
      });

      if (gateOpen) {
        gateOpen = false;
        document.body.classList.add('is-locked');
        lockScreen.classList.remove('is-dismissed', 'is-unlocked');
        lockScreen.removeAttribute('aria-hidden');
        lockScreen.setAttribute('aria-live', 'off');
        lockTitle.innerHTML = lockCopy.title;
        lockTeaser.textContent = lockCopy.teaser;
        lockTeaser.hidden = false;
        lockCountdown.hidden = false;
        unlockedMessage.hidden = true;
        lockLocalTimeNote.hidden = false;
      }
      return;
    }

    if (gateOpen) return;
    gateOpen = true;
    document.body.classList.remove('is-locked');
    lockScreen.classList.add('is-unlocked');
    lockScreen.setAttribute('aria-live', 'polite');
    lockTitle.textContent = "IT'S YOUR SPECIAL DAY, VALIJA RAMEEN! 🎂💗";
    lockTeaser.hidden = true;
    lockCountdown.hidden = true;
    lockLocalTimeNote.hidden = true;
    unlockedMessage.hidden = false;
    if (!reducedMotion) {
      window.BirthdayFX.burst(58);
      window.BirthdayFX.fireworks(8);
      window.BirthdayFX.hearts(window.innerWidth / 2, window.innerHeight * 0.62, 16);
    }
    if (!interactionsStarted) {
      interactionsStarted = true;
      document.dispatchEvent(new Event('birthday:unlock'));
    }
  }

  updateBirthdayGate();
  window.setInterval(updateBirthdayGate, 1000);
  window.addEventListener('pageshow', updateBirthdayGate);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') updateBirthdayGate();
  });
  window.addEventListener('focus', updateBirthdayGate);
  if (lockScreen) {
    lockScreen.setAttribute('aria-live', 'off');
    lockScreen.addEventListener('click', (event) => {
      const openButton = event.target.closest('[data-open-birthday]');
      if (!openButton) return;
      updateBirthdayGate();
      if (!gateOpen) return;
      lockScreen.classList.add('is-dismissed');
      lockScreen.setAttribute('aria-hidden', 'true');
      if (document.body.dataset.page === 'home') {
        event.preventDefault();
        document.querySelector('#celebration')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('is-loading');
    window.addEventListener('load', () => {
      window.setTimeout(() => loadingScreen.classList.add('is-done'), 180);
    }, { once: true });
  }

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      navigation.classList.toggle('is-open', open);
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
        navigation.classList.remove('is-open');
      }
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.primary-nav a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });

  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeKey = 'valija-birthday-theme';
  try {
    if (localStorage.getItem(themeKey) === 'dark') document.body.classList.add('theme-dark');
  } catch (error) {
    // The theme still works for this page when storage is unavailable.
  }
  if (themeButton) {
    const updateThemeLabel = () => {
      const dark = document.body.classList.contains('theme-dark');
      themeButton.textContent = dark ? '☀️' : '🌙';
      themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      themeButton.setAttribute('aria-pressed', String(dark));
    };
    updateThemeLabel();
    themeButton.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      updateThemeLabel();
      try {
        localStorage.setItem(themeKey, document.body.classList.contains('theme-dark') ? 'dark' : 'light');
      } catch (error) {
        // Keep the selected theme for the current page if storage is unavailable.
      }
    });
  }

  const topButton = document.querySelector('.back-to-top');
  if (topButton) {
    const updateTopButton = () => topButton.classList.toggle('is-visible', window.scrollY > 420);
    window.addEventListener('scroll', updateTopButton, { passive: true });
    updateTopButton();
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const typeLine = document.querySelector('[data-typing]');
  if (typeLine) {
    const lines = [
      'Hey, Valija Rameen!',
      'Today is all about YOU!',
      'Someone special deserves a beautiful day.',
      'Happy Birthday, Rameen! 🎂'
    ];
    let lineIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    const typeNext = () => {
      const text = lines[lineIndex];
      typeLine.textContent = text.slice(0, characterIndex);
      if (!deleting && characterIndex < text.length) {
        characterIndex += 1;
        window.setTimeout(typeNext, 62);
      } else if (!deleting) {
        deleting = true;
        window.setTimeout(typeNext, 1350);
      } else if (characterIndex > 0) {
        characterIndex -= 1;
        window.setTimeout(typeNext, 26);
      } else {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        window.setTimeout(typeNext, 240);
      }
    };
    if (reducedMotion) typeLine.textContent = lines[lines.length - 1];
    else typeNext();
  }

  const countdown = document.querySelector('[data-countdown]');
  if (countdown) {
    const parts = countdown.querySelectorAll('[data-time]');
    const updateCountdown = () => {
      const now = new Date();
      const currentYearBirthday = birthdayTarget(now.getFullYear());
      if (now.getTime() >= currentYearBirthday && now.getMonth() === 10 && now.getDate() === 9) {
        countdown.textContent = 'It is your day — happy birthday, Valija Rameen! 🎂';
        return true;
      }

      const nextBirthday = now.getTime() >= currentYearBirthday
        ? birthdayTarget(now.getFullYear() + 1)
        : currentYearBirthday;
      const remaining = Math.max(0, nextBirthday - now.getTime());
      const values = [
        Math.floor(remaining / 86400000),
        Math.floor((remaining / 3600000) % 24),
        Math.floor((remaining / 60000) % 60),
        Math.floor((remaining / 1000) % 60)
      ];
      parts.forEach((part, index) => {
        part.textContent = String(values[index]).padStart(2, '0');
      });
      return false;
    };

    if (!updateCountdown()) {
      const countdownTimer = window.setInterval(() => {
        if (updateCountdown()) window.clearInterval(countdownTimer);
      }, 1000);
    }
  }

  const cursorEnabled = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion;
  if (cursorEnabled) {
    let lastHeart = 0;
    document.addEventListener('pointermove', (event) => {
      if (Date.now() - lastHeart < 180) return;
      lastHeart = Date.now();
      const heart = document.createElement('span');
      heart.className = 'cursor-heart';
      heart.textContent = Math.random() > 0.5 ? '♥' : '✦';
      heart.setAttribute('aria-hidden', 'true');
      heart.style.left = `${event.clientX}px`;
      heart.style.top = `${event.clientY}px`;
      heart.style.color = Math.random() > 0.5 ? '#d76599' : '#a17bcf';
      document.body.appendChild(heart);
      window.setTimeout(() => heart.remove(), 1000);
    }, { passive: true });
  }

  const musicButton = document.querySelector('[data-music-toggle]');
  if (musicButton) {
    let context = null;
    let timer = null;
    let noteIndex = 0;
    let playing = false;
    const melody = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 392];
    const setMusicState = (isPlaying) => {
      playing = isPlaying;
      musicButton.textContent = playing ? '🔊' : '🎵';
      musicButton.setAttribute('aria-label', playing ? 'Turn birthday music off' : 'Turn birthday music on');
      musicButton.setAttribute('aria-pressed', String(playing));
    };
    const playNote = () => {
      if (!context || context.state !== 'running') return;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = melody[noteIndex % melody.length];
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.48);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.5);
      noteIndex += 1;
    };
    setMusicState(false);
    musicButton.addEventListener('click', async () => {
      if (playing) {
        window.clearInterval(timer);
        timer = null;
        if (context) await context.suspend();
        setMusicState(false);
        return;
      }
      if (!('AudioContext' in window) && !('webkitAudioContext' in window)) {
        musicButton.setAttribute('aria-label', 'Birthday music is not supported by this browser');
        return;
      }
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      context = context || new AudioContextConstructor();
      await context.resume();
      playNote();
      timer = window.setInterval(playNote, 620);
      setMusicState(true);
    });
  }
}());
