const introOverlay = document.getElementById('intro-overlay');
const introVideo = document.getElementById('intro-video');
const mainContent = document.getElementById('main-content');

// When video ends, automatically transition to main website
introVideo.onended = function() {
    startWebsite();
};

function startWebsite() {
    introOverlay.style.opacity = '0';
    setTimeout(() => {
        introOverlay.style.display = 'none';
        mainContent.classList.add('visible');
    }, 1000);
}

// Countdown Logic targeting October 18, 2026
const weddingDate = new Date('October 18, 2026 19:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const gap = weddingDate - now;

    if (gap < 0) return;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(gap / day);
    const hours = Math.floor((gap % day) / hour);
    const minutes = Math.floor((gap % hour) / minute);
    const seconds = Math.floor((gap % minute) / second);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Scratch Card Logic
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// Fill scratch cover with golden luxury color
ctx.fillStyle = '#c5a059';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 16px Cinzel, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Scratch To Reveal Date', canvas.width / 2, canvas.height / 2 + 6);

let isDrawing = false;

function scratch(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (!clientX || !clientY) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
}

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mousemove', scratch);
window.addEventListener('mouseup', () => isDrawing = false);

canvas.addEventListener('touchstart', () => isDrawing = true);
canvas.addEventListener('touchmove', scratch);
window.addEventListener('touchend', () => isDrawing = false);

