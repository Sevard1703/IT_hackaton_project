(() => {
  const bugBtn = document.getElementById('bugButton');
  const fixBtn = document.getElementById('fixButton');
  const panel = document.getElementById('errorPanel');
  const app = document.getElementById('app');

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const messages = [
    "TypeError: undefined is not a function",
    "ReferenceError: youBrokeIt is not defined",
    "Warning: React has melted",
    "SyntaxError: Unexpected token '🤡'",
    "Error 418: I'm a teapot",
    "Fatal: Too much cringe detected",
    "404: Sanity not found",
    "AIException: User is the bug",
    "NullPointerException: Happiness was null",
    "panic: runtime error: invalid memory address"
  ];

  const insults = [
    "Ты серьёзно нажал это? 🤦",
    "Поздравляю, ты только что удалил прод.",
    "Системный админ плачет где-то в углу.",
    "Кажется, ты и есть баг здесь.",
    "Ты дебагер, ты и баг… помнишь?",
    "Мама говорила, что кнопки нажимать нельзя."
  ];

  function log(msg, isError = true) {
    const el = document.createElement('div');
    el.textContent = msg;
    el.className = isError ? 'text-red-400' : 'text-amber-300';
    panel.prepend(el);
    if (panel.children.length > 50) panel.removeChild(panel.lastChild);
    // mirror to console
    if(isError) console.error(msg); else console.warn(msg);
  }

  function randomCSSChaos() {
    const hues = ['0deg','90deg','180deg','270deg'];
    app.style.filter = 'hue-rotate(' + random(hues) + ') brightness(' + (0.5 + Math.random()).toFixed(2) + ')';
    app.style.transform = 'rotate(' + (Math.random()*6-3).toFixed(1) + 'deg) scale('+(0.9+Math.random()*0.3).toFixed(2)+')';
  }

  function spawnGhostButton() {
    const btn = document.createElement('button');
    btn.textContent = 'Призрачная кнопка';
    btn.className = 'btn-red mt-2 glitch';
    btn.onclick = () => {
      btn.remove();
      log('GhostButton swallowed itself.', false);
    };
    app.appendChild(btn);
  }

  function throwFakeError() {
    log(random(messages), true);
  }

  function blameUser() {
    log(random(insults), false);
  }

  const bugs = [randomCSSChaos, spawnGhostButton, throwFakeError, blameUser];

  bugBtn.addEventListener('click', () => {
    random(bugs)();
  });

  fixBtn.addEventListener('click', () => {
    // Instead of fixing, triple the chaos
    for(let i=0;i<3;i++) random(bugs)();
    log('Attempted fix made everything worse 🔥', true);
  });

  // Periodic random bug every 10‑20s
  setInterval(() => {
    random(bugs)();
  }, 10000 + Math.random()*10000);
})();