// =======================================
// ハンバーガーメニュー
// =======================================
const hamburger = document.querySelector('.header__hamburger');
const nav = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll('.header__item a');

hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('is-open');
    nav.classList.toggle('is-open');
});

navLinks.forEach((link)=>{
    link.addEventListener('click',()=>{
        hamburger.classList.remove('is-open');
        nav.classList.remove('is-open');
    });
});