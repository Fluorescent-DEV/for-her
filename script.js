// 1. EFEK BUNGA BERGUGURAN GLOBAL
function createPetal() {
  const container = document.getElementById('plum-blossom-container');
  if (!container) return;
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.left = Math.random() * window.innerWidth + 'px';
  const size = Math.random() * 8 + 6; 
  petal.style.width = size + 'px';
  petal.style.height = size + 'px';
  const duration = Math.random() * 6 + 4; 
  petal.style.animationDuration = duration + 's';
  container.appendChild(petal);
  setTimeout(() => { petal.remove(); }, duration * 1000);
}
setInterval(createPetal, 300);

// 2. EFEK TABURAN BUNGA MENGIKUTI JARI/CURSOR (TRAIL)
window.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'cursor-petal';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  document.body.appendChild(trail);
  setTimeout(() => { trail.remove(); }, 800);
});
window.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const trail = document.createElement('div');
  trail.className = 'cursor-petal';
  trail.style.left = touch.clientX + 'px';
  trail.style.top = touch.clientY + 'px';
  document.body.appendChild(trail);
  setTimeout(() => { trail.remove(); }, 800);
});

// 3. SISTEM INTERAKSI POP-UP MODAL SURAT
window.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-popup-btn');
  const closeBtn = document.getElementById('close-popup-btn');
  const overlay = document.getElementById('popup-overlay');

  if (openBtn && closeBtn && overlay) {
    openBtn.addEventListener('click', () => { overlay.classList.add('active'); });
    closeBtn.addEventListener('click', () => { overlay.classList.remove('active'); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });
  }

  // 4. LOGIKA AUDIO AUTO PLAY LOCAL FILE (MUTED BYPASS)
  const music = document.getElementById('bg-music');
  const progressBar = document.getElementById('ios-progress');
  const playBtn = document.getElementById('play-trigger');
  
  if (!music || !progressBar || !playBtn) return;

  music.muted = true;
  music.play().then(() => {
    playBtn.innerText = "⏸ PAUSE";
  }).catch(err => console.log("Menunggu bypass interaksi user..."));

  music.addEventListener('timeupdate', () => {
    if (music.duration > 0) {
      const progressPercent = (music.currentTime / music.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }
  });

  function nyalakanAudio() {
    music.muted = false;
    playBtn.innerText = "⏸ PAUSE";
    window.removeEventListener('click', nyalakanAudio);
    window.removeEventListener('scroll', nyalakanAudio);
    window.removeEventListener('touchstart', nyalakanAudio);
  }
  window.addEventListener('click', nyalakanAudio);
  window.addEventListener('scroll', nyalakanAudio);
  window.addEventListener('touchstart', nyalakanAudio);

  playBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (music.paused) {
      music.muted = false;
      music.play();
      playBtn.innerText = "⏸ PAUSE";
    } else {
      music.pause();
      playBtn.innerText = "▶ PLAY";
    }
  });
});

// 5. TAMBAHAN: DEKORASI & NAMA BERTERBANGAN
function addDecorations() {
  const icons = ['☕', '🍛', '🧸', '⭐'];
  const body = document.body;
  for (let i = 0; i < 15; i++) {
    const span = document.createElement('span');
    span.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    span.style.position = 'absolute';
    span.style.fontSize = '24px';
    span.style.opacity = '0.2';
    span.style.zIndex = '1';
    span.style.pointerEvents = 'none';
    span.style.left = Math.random() * 95 + 'vw';
    span.style.top = Math.random() * 3000 + 'px'; 
    body.appendChild(span);
  }
}

function showFlyingName(e) {
  const name = document.createElement('div');
  name.innerText = "Mal"; // Ganti "Mal" dengan nama panggilanmu
  name.style.position = 'fixed';
  name.style.left = e.clientX + 'px';
  name.style.top = e.clientY + 'px';
  name.style.color = '#ff527b';
  name.style.fontWeight = 'bold';
  name.style.fontSize = '20px';
  name.style.zIndex = '999999';
  name.style.pointerEvents = 'none';
  name.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
  document.body.appendChild(name);

  name.animate([
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: 'translateY(-150px)', opacity: 0 }
  ], {
    duration: 2000,
    easing: 'ease-out'
  }).onfinish = () => name.remove();
}

window.addEventListener('load', addDecorations);
document.addEventListener('click', showFlyingName);
