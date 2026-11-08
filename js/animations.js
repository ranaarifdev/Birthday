(function () {
  const colors = ['#f3a5c5', '#c6b5f2', '#b6dff0', '#f0c77b', '#ffffff'];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function burst(count) {
    if (reducedMotion) return;
    const total = Math.min(count || 46, 80);
    for (let index = 0; index < total; index += 1) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.setAttribute('aria-hidden', 'true');
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.backgroundColor = colors[index % colors.length];
      piece.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
      piece.style.animationDelay = `${Math.random() * 0.65}s`;
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      document.body.appendChild(piece);
      window.setTimeout(() => piece.remove(), 3700);
    }
  }

  function hearts(x, y, count) {
    if (reducedMotion) return;
    const glyphs = ['♥', '✦', '✿'];
    const total = Math.min(count || 8, 18);
    for (let index = 0; index < total; index += 1) {
      const heart = document.createElement('span');
      heart.className = 'burst-heart';
      heart.setAttribute('aria-hidden', 'true');
      heart.textContent = glyphs[index % glyphs.length];
      heart.style.left = `${x + Math.random() * 70 - 35}px`;
      heart.style.top = `${y + Math.random() * 28 - 14}px`;
      heart.style.color = colors[index % colors.length];
      heart.style.fontSize = `${14 + Math.random() * 15}px`;
      heart.style.animationDelay = `${Math.random() * 0.3}s`;
      document.body.appendChild(heart);
      window.setTimeout(() => heart.remove(), 1900);
    }
  }

  function petals(container, count) {
    if (reducedMotion || !container) return;
    const total = Math.min(count || 16, 24);
    for (let index = 0; index < total; index += 1) {
      const petal = document.createElement('span');
      petal.className = 'falling-petal';
      petal.setAttribute('aria-hidden', 'true');
      petal.textContent = ['🌸', '🌷', '✿'][index % 3];
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.animationDelay = `${Math.random() * 7}s`;
      petal.style.animationDuration = `${6 + Math.random() * 5}s`;
      container.appendChild(petal);
    }
  }

  function fireworks(count) {
    if (reducedMotion) return;
    const palette = ['#ffd77d', '#f4a8cc', '#c6b5f2', '#b6dff0'];
    const total = Math.min(count || 5, 10);
    for (let index = 0; index < total; index += 1) {
      const firework = document.createElement('span');
      firework.className = 'firework';
      firework.setAttribute('aria-hidden', 'true');
      firework.style.left = `${12 + Math.random() * 76}vw`;
      firework.style.top = `${12 + Math.random() * 45}vh`;
      firework.style.setProperty('--firework-color', palette[index % palette.length]);
      firework.style.animationDelay = `${Math.random() * 1.2}s`;
      document.body.appendChild(firework);
      window.setTimeout(() => firework.remove(), 2300);
    }
  }

  window.BirthdayFX = { burst, hearts, petals, fireworks };
}());
