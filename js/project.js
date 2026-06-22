// ----- Basic carousel with arrows, dots, autoplay, and swipe -----
const slider = document.getElementById('slider');
const slides = Array.from(slider.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('indicators');
const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');

let current = 0;
let timer = null;
const AUTO_MS = 4000;

// create dots
const dots = slides.map((_, i) => {
  const d = document.createElement('span');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(d);
  return d;
});

function update() {
  // translate track by index
  slider.style.transform = `translateX(-${current * 100}%)`;
  // update dots
  dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}

function goTo(i) {
  current = (i + slides.length) % slides.length;
  update();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

// arrows
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

// autoplay
function startAuto() { stopAuto(); timer = setInterval(next, AUTO_MS); }
function stopAuto()  { if (timer) clearInterval(timer); }
startAuto();

// pause on hover (desktop)
slider.parentElement.addEventListener('mouseenter', stopAuto);
slider.parentElement.addEventListener('mouseleave', startAuto);

// swipe (mobile)
let startX = 0;
let isTouching = false;

slider.addEventListener('touchstart', (e) => {
  isTouching = true;
  startX = e.touches[0].clientX;
  stopAuto();
}, {passive:true});

slider.addEventListener('touchmove', (e) => {
  if (!isTouching) return;
  // optional: implement drag feedback if you want
}, {passive:true});

slider.addEventListener('touchend', (e) => {
  if (!isTouching) return;
  const endX = e.changedTouches[0].clientX;
  const delta = endX
