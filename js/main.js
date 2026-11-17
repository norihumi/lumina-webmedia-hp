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
    const slider = document.querySelector('.top-mv__slider'); 
    
    // ★「もしこのページにスライダーが存在するなら」というガード句を入れる
    if (slider) {
        const slides = document.querySelectorAll('.top-mv__slide');
        const dots = document.querySelectorAll('.top-mv__dot');
        const prevBtn = document.querySelector('.top-mv__btn--prev');
        const nextBtn = document.querySelector('.top-mv__btn--next');

        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoSlideTimer = null;

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

        // 自動スライドを開始する関数
        function startAutoSlide() {
            if (autoSlideTimer) clearInterval(autoSlideTimer);
            autoSlideTimer = setInterval(nextSlide, 3000);
        }

        // 自動スライドを停止する関数
        function stopAutoSlide() {
            clearInterval(autoSlideTimer);
        }

        // 矢印ボタンのクリックイベント（存在する場合のみ登録）
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide();
            });
        }

        // ドットクリックで該当スライドへ移動
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    showSlide(currentIndex);
                    startAutoSlide();
                });
            });
        }

        // マウスホバー時の動作
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);

        // 初期化：最初の自動スライドを開始
        startAutoSlide();
    }
});

// =======================================
// <ARCHIVE> 選択中の項目の変化 (category)
// =======================================
const categoryItems = document.querySelectorAll(".archive-category__item");

categoryItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); // ページがジャンプするのを防ぐ場合など

        // 1. すべての項目から is-active を外す
        categoryItems.forEach(el => el.classList.remove('is-active'));

        // 2. クリックされた項目だけに is-active をつける
        this.classList.add('is-active');
    });
});

// ========================================================
// ヘッダーからカテゴリーフィルターへの移動
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.archive-category__button');
    const cards = document.querySelectorAll('.archive-catalog__card');

    // ガード句：もしボタンやカードが存在しないページならここでストップ（エラー防止）
    if (filterButtons.length === 0 || cards.length === 0) return;

    // ==========================================
    // 共通の絞り込み処理を行う関数（まとめ箱）
    // ==========================================
    function applyFilter(category) {
        // 1. ボタンの親要素である li (.archive-category__item) を探して is-active を付け外し
        const items = document.querySelectorAll('.archive-category__item');
        
        items.forEach(item => {
            const btn = item.querySelector('.archive-category__button');
            if (btn) {
                const btnFilter = btn.getAttribute('data-filter');
                if (btnFilter === category) {
                    item.classList.add('is-active'); // 一致する li に付与
                } else {
                    item.classList.remove('is-active'); // 一致しない li からは外す
                }
            }
        });

        // 2. 各カードをチェックして表示/非表示を切り替え
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block'; // 一致する場合は表示
            } else {
                card.style.display = 'none';  // 一致しない場合は非表示
            }
        });
    }

    // ==========================================
    // ① ページ読み込み時（URLパラメータのチェック）
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const targetCategory = urlParams.get('category'); // 例: ?category=interior なら "interior" が取れる

    if (targetCategory) {
        // パラメータがある場合は、そのカテゴリーで絞り込む
        applyFilter(targetCategory);
    } else {
        // パラメータがない（または archive.html のみで開かれた）場合は 'all' にする
        applyFilter('all');
    }

    // ==========================================
    // ② ボタンをクリックしたときの処理
    // ==========================================
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // リンクの本来のジャンプ動作をストップ

            // クリックされたボタンのカテゴリーを取得
            const category = button.getAttribute('data-filter');

            // 共通関数を呼び出して絞り込みを実行
            applyFilter(category);

            // ついでにブラウザのURLも書き換える（ページ移動せずに ?category=〇〇 を付与）
            const newUrl = category === 'all' ? 'archive.html' : `archive.html?category=${category}`;
            window.history.pushState({}, '', newUrl);
        });
    });
});