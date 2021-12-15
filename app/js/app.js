import Swiper, { Navigation } from 'swiper'

Swiper.use([Navigation])

document.addEventListener('DOMContentLoaded', () => {

	const header = document.querySelector('.header')

	function scrollHeader () {
	    if (window.pageYOffset > 0) {
	        header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    }

    scrollHeader()

	window.addEventListener('scroll', () => {
        scrollHeader()
    })

    const bannersBlock = document.querySelectorAll('.banners-block')

    bannersBlock.forEach(bannerBlock => {
        const banners = bannerBlock.querySelector('.banners')
        const bannersNavThumbs = bannerBlock.querySelectorAll('.banners-nav-thumb')
        const bannersNavPrev = bannerBlock.querySelector('.banners-prev')
        const bannersNavNext = bannerBlock.querySelector('.banners-next')

        const bannersSwiper = new Swiper(banners, {
            slidesPerView: 1,
            speed: 800,
            navigation: {
                prevEl: bannersNavPrev,
                nextEl: bannersNavNext
            },
        })

        bannersNavThumbs.forEach((navItem, navIndex) => {
            navItem.addEventListener('click', e => {
                if (!navItem.classList.contains('active')) {
                    bannersNavThumbs.forEach(item => item.classList.remove('active'))
                    navItem.classList.add('active')
                    banners.swiper.slideTo(navIndex)
                }
            })
        })

        banners.swiper.on('slideChange', () => {
            const index = banners.swiper.activeIndex
            bannersNavThumbs.forEach((navItem, navIndex) => {
                if (index === navIndex) {
                    navItem.classList.add('active')
                } else {
                    navItem.classList.remove('active')
                }
            })
        })
    })


})
