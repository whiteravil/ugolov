import Swiper, { Navigation } from 'swiper'
import IMask from 'imask'

Swiper.use([Navigation])

document.addEventListener('DOMContentLoaded', () => {

    function getCurrentInnerHeight () {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    getCurrentInnerHeight()

    window.addEventListener('resize', getCurrentInnerHeight)


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
        const bannersNavThumbs = bannerBlock.querySelector('.banners-nav-thumbs')
        const bannersNavThumb = bannerBlock.querySelectorAll('.banners-nav-thumb')
        const bannersNavPrev = bannerBlock.querySelector('.banners-prev')
        const bannersNavNext = bannerBlock.querySelector('.banners-next')

        const bannersSwiper = new Swiper(banners, {
            slidesPerView: 1,
            speed: 800,
            navigation: {
                prevEl: bannersNavPrev,
                nextEl: bannersNavNext
            }
        })

        const bannersNavThumbsSwiper = new Swiper(bannersNavThumbs, {
            slidesPerView: 3,
            speed: 800,
            allowTouchMove: false,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                }
            }
        })

        bannersNavThumb.forEach((navItem, navIndex) => {
            navItem.addEventListener('click', e => {
                if (!navItem.classList.contains('active')) {
                    bannersNavThumb.forEach(item => item.classList.remove('active'))
                    navItem.classList.add('active')
                    bannersSwiper.slideTo(navIndex)
                }
            })
        })

        banners.swiper.on('slideChange', () => {
            const index = banners.swiper.activeIndex
            bannersNavThumbsSwiper.slideTo(index)
            bannersNavThumb.forEach((item, thumbIndex) => {
                if (thumbIndex === index) {
                    item.classList.add('active')
                } else {
                    item.classList.remove('active')
                }
            })
            navItem.classList.add('active')
        })
    })

    const clients = document.querySelectorAll('.clients')

    clients.forEach(clientsBlock => {
        const prevNav = clientsBlock.querySelector('.slider-prev')
        const nextNav = clientsBlock.querySelector('.slider-next')

        const slider = new Swiper(clientsBlock, {
            slidesPerView: 5,
            speed: 800,
            spaceBetween: 30,
            navigation: {
                prevEl: prevNav,
                nextEl: nextNav
            },
            watchSlidesProgress: true,
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 14
                },
                576: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                768: {
                    slidesPerView: 5
                }
            }
        })
    })

    const tabsWrapper = document.querySelectorAll('.tabs-wrapper')

    tabsWrapper.forEach(tabWrapper => {
        const navTabsLinks = tabWrapper.querySelectorAll('.tabs-nav a')
        const tabs = tabWrapper.querySelectorAll('.tab')

        navTabsLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()
                if (!link.classList.contains('active')) {
                    const dataTab = link.getAttribute('data-tab')
                    const neededTab = tabWrapper.querySelector(`.tab[data-tab=${dataTab}]`)

                    tabs.forEach(tabsItem => {
                        tabsItem.style.display = 'none'
                        tabsItem.classList.remove('active')
                    })

                    navTabsLinks.forEach(linkItem => linkItem.classList.remove('active'))

                    link.classList.add('active')
                    neededTab.style.display = 'block'

                    setTimeout(() => {
                        neededTab.classList.add('active')
                    }, 20)
                }
            })
        })
    })

    const newsSlider = document.querySelectorAll('.news-slider')

    newsSlider.forEach(newsSliderItem => {
        const prevNav = newsSliderItem.querySelector('.slider-prev')
        const nextNav = newsSliderItem.querySelector('.slider-next')

        const slider = new Swiper(newsSliderItem, {
            slidesPerView: 3,
            speed: 800,
            spaceBetween: 20,
            navigation: {
                prevEl: prevNav,
                nextEl: nextNav
            },
            watchSlidesProgress: true,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                }
            }
        })
    })

    const forms = document.querySelectorAll('.js-form')

    forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault()

            const requiredInput = form.querySelectorAll('.required')
            const success = form.querySelector('.form-success')
            let canSend = true

            requiredInput.forEach(input => {
                if (input.value.trim().length === 0) {
                    input.classList.add('invalid')
                    canSend = false
                }
            })

            if (canSend) {
                //Запрос
                success.classList.add('active')
            }
        })

    })

    const openPopupLinks = document.querySelectorAll('.open-popup')
    const closePopupLinks = document.querySelectorAll('.popup-close')
    const universalClosePopupLinks = document.querySelectorAll('.close-popup')

    openPopupLinks.forEach(popupLink => {
        popupLink.addEventListener('click', e => {
            e.preventDefault()
            const id = popupLink.getAttribute('href')
            openPopup(id)
        })
    })

    closePopupLinks.forEach(popupCloseLink => {
        popupCloseLink.addEventListener('click', closePopup)
    })

    universalClosePopupLinks.forEach(popupCloseLink => {
        popupCloseLink.addEventListener('click', closePopup)
    })

    function openPopup (id) {
	    const popup = document.querySelector(id)

        if (popup) {
            popup.style.display = 'block'
            setTimeout(() => {
                popup.classList.add('opened')
            }, 50)
        }
    }

    function closePopup () {
	    const popups = document.querySelectorAll('.popup-wrapper')

        popups.forEach(popup => {
            popup.classList.remove('opened')
            setTimeout(() => {
                popup.style.display = 'none'
            }, 400)
        })

        console.log(document.querySelectorAll('.form-success'))

        document.querySelectorAll('.form-success').forEach(success => success.classList.remove('active'))
        document.querySelectorAll('form .invalid').forEach(success => success.classList.remove('invalid'))
    }

    const mobMenu = document.querySelector('.header-menu')
    const mobMenuBtn = document.querySelector('.header-menu-btn')

    mobMenuBtn.addEventListener('click', () => {
        mobMenuBtn.classList.toggle('active')
        mobMenu.classList.toggle('opened')
    })

    function closeMobMenu () {
        mobMenuBtn.classList.remove('active')
        mobMenu.classList.remove('opened')
    }

    document.addEventListener('click', e => {
        const tg = e.target
        if (!tg.closest('.header-menu') && !tg.closest('.header-menu-btn')) {
            closeMobMenu()
        }
    })

    const phone = document.querySelectorAll('.phone-mask')
    phone.forEach(phoneItem => {
        const phoneMask = IMask(phoneItem, {
            mask: '+{7}(000)000-00-00'
        })
    })
})
