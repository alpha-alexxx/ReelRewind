export function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            // when window width is >= 320px
            500: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 480px
            700: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            // when window width is >= 640px
            1200: {
                slidesPerView: 4,
                spaceBetween: 40
            }
        }
    })
}