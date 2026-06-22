document.addEventListener('DOMContentLoaded', function () {
const carousel = document.querySelector('.carousel');
if (!carousel) return;

const imagesAttr = carousel.getAttribute('data-images') || '';
const images = imagesAttr.split(',').map(s => s.trim()).filter(Boolean);
if (images.length === 0) return;

let current = 0;
const len = images.length;

const leftEl = carousel.querySelector('.carousel-item[data-pos="left"]');
const centerEl = carousel.querySelector('.carousel-item[data-pos="center"]');
const rightEl = carousel.querySelector('.carousel-item[data-pos="right"]');
const prevBtn = carousel.querySelector('.carousel-btn.prev');
const nextBtn = carousel.querySelector('.carousel-btn.next');

function idx(i) { return (i + len) % len; }

function render() {
    const leftIdx = idx(current - 1);
    const rightIdx = idx(current + 1);

    leftEl.innerHTML = `<img src="${images[leftIdx]}" alt="Imagem ${leftIdx + 1}">`;
    centerEl.innerHTML = `<img src="${images[current]}" alt="Imagem ${current + 1}">`;
    rightEl.innerHTML = `<img src="${images[rightIdx]}" alt="Imagem ${rightIdx + 1}">`;

    // ensure correct classes (in case you want animations)
    leftEl.classList.remove('center','right'); leftEl.classList.add('left');
    centerEl.classList.remove('left','right'); centerEl.classList.add('center');
    rightEl.classList.remove('left','center'); rightEl.classList.add('right');
}

function go(delta) {
    current = idx(current + delta);
    render();
}

prevBtn.addEventListener('click', () => go(-1));
nextBtn.addEventListener('click', () => go(1));

// clicar nas laterais avança/volta
leftEl.addEventListener('click', () => go(-1));
rightEl.addEventListener('click', () => go(1));

// permitir setar index ao clicar na center (se quiser ampliar)
centerEl.addEventListener('click', () => {
    // por exemplo, avançar
    // go(1);
});

// navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
});

render();
});
