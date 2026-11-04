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

// =======================================
// スライダー
// =======================================
document.addEventListener('DOMContentLoaded', () => {
    // 要素の取得
    const slider = document.querySelector('.top-mv__slider'); // ★ マウスホバー判定用にスライダー全体を取得
    const slides = document.querySelectorAll('.top-mv__slide');
    const dots = document.querySelectorAll('.top-mv__dot');
    const prevBtn = document.querySelector('.top-mv__btn--prev');
    const nextBtn = document.querySelector('.top-mv__btn--next');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideTimer = null; // ★ タイマー管理用の変数

    // 指定したインデックスのスライドを表示する関数
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('is-active'));
        dots.forEach(dot => dot.classList.remove('is-active'));

        slides[index].classList.add('is-active');
        dots[index].classList.add('is-active');
    }

    // 次のスライドへ進む
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    // 前のスライドへ戻る
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    // ★ 自動スライドを開始する関数（3000ms = 3秒ごと）
    function startAutoSlide() {
        // 既存のタイマーがあれば一度クリアして重複を防ぐ
        if (autoSlideTimer) clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(nextSlide, 3000);
    }

    // ★ 自動スライドを停止する関数
    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }

    // 矢印ボタンのクリックイベント
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide(); // 手動操作後もタイマーをリセットして自動送りを継続
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide(); // 手動操作後もタイマーをリセットして自動送りを継続
    });

    // ドットクリックで該当スライドへ移動
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
            startAutoSlide(); // 手動操作後もタイマーをリセットして自動送りを継続
        });
    });

    // ★ マウスホバー時の動作（乗ったら停止、離れたら再開）
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // ★ 初期化：最初の自動スライドを開始
    startAutoSlide();
});