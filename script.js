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

// 2. EFEK TABURAN BUNGA (TRAIL)
window.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'cursor-petal';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  document.body.appendChild(trail);
  setTimeout(() => { trail.remove(); }, 800);
});

// 3. SISTEM INTERAKSI & LOGIKA MUSIK
window.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-popup-btn');
  const closeBtn = document.getElementById('close-popup-btn');
  const overlay = document.getElementById('popup-overlay');
  const music = document.getElementById('bg-music');
  const progressBar = document.getElementById('ios-progress');
  const playBtn = document.getElementById('play-trigger');

  // Popup Logic
  if (openBtn && closeBtn && overlay) {
    openBtn.addEventListener('click', () => { overlay.classList.add('active'); });
    closeBtn.addEventListener('click', () => { overlay.classList.remove('active'); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });
  }

  // Music Logic (Fixed Sync)
  if (music && progressBar && playBtn) {
    music.addEventListener('timeupdate', () => {
      if (music.duration > 0) {
        const progress = (music.currentTime / music.duration) * 100;
        progressBar.style.width = progress + "%";
      }
    });

    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (music.paused) {
        music.play();
        playBtn.innerText = "⏸ PAUSE";
      } else {
        music.pause();
        playBtn.innerText = "▶ PLAY";
      }
    });

    const startAudio = () => {
      music.play().then(() => {
        playBtn.innerText = "⏸ PAUSE";
        window.removeEventListener('click', startAudio);
      }).catch(e => console.log("Menunggu interaksi user..."));
    };
    window.addEventListener('click', startAudio, { once: true });
  }

  // 4. FITUR DEKORASI & HATI (Muncul di bawah judul "A Garden Grown")
  const footer = document.querySelector('.section-footer');
  if (footer) {
    const heartGroup = document.createElement('div');
    heartGroup.style.textAlign = 'center';
    heartGroup.style.marginTop = '20px';
    heartGroup.innerHTML = `
        <div style="font-size: 30px; letter-spacing: 15px; margin-bottom:10px; opacity:0.5;">☕ 🍛 🧸 ⭐</div>
        <div id="heart-btn" style="font-size: 45px; cursor: pointer; display:inline-block;">💖</div>
        <div style="font-size: 12px; font-style: italic; color: #ffb7c5; opacity: 0.8; margin-top:5px;">coba click</div>
    `;
    footer.appendChild(heartGroup);

    document.getElementById('heart-btn').onclick = (e) => {
      const name = document.createElement('div');
      name.innerText = "Mal"; // GANTI NAMA KAMU DI SINI
      name.style.position = 'fixed';
      name.style.left = e.clientX + 'px';
      name.style.top = e.clientY + 'px';
      name.style.color = '#ff527b';
      name.style.fontWeight = 'bold';
      name.style.fontSize = '25px';
      name.style.zIndex = '999999';
      name.style.pointerEvents = 'none';
      name.style.textShadow = '0 0 10px rgba(255,255,255,0.7)';
      document.body.appendChild(name);
      
      name.animate([{ transform: 'translateY(0px) scale(1)', opacity: 1 }, { transform: 'translateY(-200px) scale(1.5)', opacity: 0 }], 2000)
          .onfinish = () => name.remove();
    };
  }
});
