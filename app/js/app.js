import Swiper, { Navigation, Manipulation, Autoplay } from 'swiper'
import IMask from 'imask'

const styleSelect = require('styleSelect')

Swiper.use([Navigation, Manipulation, Autoplay])

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
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
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

        bannersSwiper.on('slideChange', () => {
            const index = bannersSwiper.activeIndex
            bannersNavThumbsSwiper.slideTo(index)
            bannersNavThumb.forEach((item, thumbIndex) => {
                if (thumbIndex === index) {
                    item.classList.add('active')
                } else {
                    item.classList.remove('active')
                }
            })
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

    const phone = document.querySelectorAll('.phone-mask')
    const number = document.querySelectorAll('.number-mask')

    phone.forEach(phoneItem => {
        const phoneMask = IMask(phoneItem, {
            mask: '+{7}(000)000-00-00'
        })
    })

    number.forEach(numberItem => {
        const numberMask = IMask(numberItem, {
            mask: Number
        })
    })

    const filters = document.querySelectorAll('.catalog-filter-item')

    filters.forEach((filter, index) => {
        const title = filter.querySelector('.catalog-filter-title')
        const dropdown = filter.querySelector('.catalog-filter-dropdown')

        title.addEventListener('click', () => {
            filters.forEach((item, itemIndex) => {
                if (itemIndex !== index) {
                    item.classList.remove('opened')
                } else {
                    item.classList.toggle('opened')
                }
            })
        })
    })

    const filterBtn = document.querySelectorAll('.filter-mob-btn')
    const filter = document.querySelector('.catalog-filter')
    const filterCloseBtn = document.querySelectorAll('.catalog-filter-mob-close')

    filterBtn.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            filter.classList.toggle('opened')
        })
    })

    filterCloseBtn.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            filter.classList.remove('opened')
        })
    })

    const gallery = document.querySelectorAll('.gallery-slider')

    gallery.forEach(galleryItem => {
        const prev = galleryItem.querySelector('.gallery-prev')
        const next = galleryItem.querySelector('.gallery-next')
        const counter = galleryItem.querySelector('.gallery-pagination-counter')
        const slidesLength = galleryItem.querySelectorAll('.gallery-slider-img').length

        const gallerySlider = new Swiper(galleryItem, {
            slidesPerView: 1,
            speed: 800,
            centeredSlides: true,
            spaceBetween: 119,
            navigation: {
                prevEl: prev,
                nextEl: next
            },
            breakpoints: {
                0: {
                    spaceBetween: 10
                },
                992: {
                    spaceBetween: 70
                },
                1366: {
                    spaceBetween: 119
                }
            }
        })

        counter.innerHTML = `1/${slidesLength}`

        gallerySlider.on('slideChange', () => {
            const index = gallerySlider.activeIndex
            counter.innerHTML = `${index + 1}/${slidesLength}`
        })

    })

    ymaps.ready(initProjectMap)

    function initProjectMap () {
        if (document.querySelector('.map-container')) {
            const projectMap = new ymaps.Map('map', {
                center: coordinates,
                zoom: 15,
                duration: 1000,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });

            const projectMapLabel = new ymaps.Placemark(coordinates, {}, {
                iconLayout: 'default#image',
                iconImageHref: 'images/dist/icons/map-marker.svg',
                iconImageSize: [42, 60],
                iconImageOffset: [-21 -30],
            })

            projectMap.geoObjects.add(projectMapLabel)
        }
    }

    const scrollTo = document.querySelectorAll('.scroll-to')

    scrollTo.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const id = link.getAttribute('href')
            const section = document.querySelector(id)
            const header = document.querySelector('.header')

            if (section) {
                const top = section.getBoundingClientRect().top + pageYOffset - header.clientHeight - 20
                window.scrollTo({
                    top,
                    left: 0,
                    behavior: 'smooth'
                })
            }
        })
    })

    const roomGalleryPopup = document.querySelector('#room-gallery')

    if (roomGalleryPopup) {
        const roomGalleryPrev = roomGalleryPopup.querySelector('.gallery-prev')
        const roomGalleryNext = roomGalleryPopup.querySelector('.gallery-next')
        const roomGallery = roomGalleryPopup.querySelector('.room-gallery-slider')
        const roomView = document.querySelectorAll('.room-photo-view')

        const roomGallerySlider = new Swiper(roomGallery, {
            slidesPerView: 1,
            speed: 800,
            centeredSlides: true,
            spaceBetween: 119,
            navigation: {
                prevEl: roomGalleryPrev,
                nextEl: roomGalleryNext
            },
            breakpoints: {
                0: {
                    spaceBetween: 10
                },
                992: {
                    spaceBetween: 70
                },
                1366: {
                    spaceBetween: 119
                }
            }
        })

        roomView.forEach(roomViewItem => {
            const id = roomViewItem.getAttribute('data-id')
            const images = rooms_gallery[id.toString()]
            roomViewItem.addEventListener('click', () => {
                roomGallerySlider.removeAllSlides()
                images.forEach(image => {
                    roomGallerySlider.appendSlide(
                        `<div class="swiper-slide">
                            <div class="gallery-slider-img">
                                <img src="${image}" alt="">
                            </div>
                        </div>`
                    )
                })
                openPopup('#room-gallery')
            })
        })
    }

    const selects = document.querySelectorAll('select.select-style')

    selects.forEach(select => {
        styleSelect(select)
    })

    const newsBanners = document.querySelectorAll('.news-banners')

    newsBanners.forEach(newsBanner => {
        const prev = newsBanner.querySelector('.banners-prev')
        const next = newsBanner.querySelector('.banners-next')

        const newsBannerSlider = new Swiper(newsBanner, {
            slidesPerView: 1,
            speed: 800,
            navigation: {
                prevEl: prev,
                nextEl: next
            }
        })
    })

    const imgSliders = document.querySelectorAll('.img-slider')

    imgSliders.forEach(imgSlider => {
        const prev = imgSlider.querySelector('.banners-prev')
        const next = imgSlider.querySelector('.banners-next')

        const newsBannerSlider = new Swiper(imgSlider, {
            slidesPerView: 1,
            speed: 800,
            navigation: {
                prevEl: prev,
                nextEl: next
            }
        })
    })

    document.querySelectorAll('img.replace-svg').forEach(element => {
        const imgID = element.getAttribute('id')
        const imgClass = element.getAttribute('class')
        const imgURL = element.getAttribute('src')

        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                const svg = xhr.responseXML.getElementsByTagName('svg')[0];
                if(imgID != null) {
                    svg.setAttribute('id', imgID);
                }
                if(imgClass != null) {
                    svg.setAttribute('class', imgClass + ' replaced-svg');
                }
                svg.removeAttribute('xmlns:a')
                if (
                    !svg.hasAttribute('viewBox') &&
                    svg.hasAttribute('height') &&
                    svg.hasAttribute('width')
                ) {
                    svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
                }
                element.parentElement.replaceChild(svg, element)
            }
        }
        xhr.open('GET', imgURL, true)
        xhr.send(null)
    })

    document.addEventListener('click', e => {
        const tg = e.target
        if (!tg.closest('.header-menu') && !tg.closest('.header-menu-btn')) {
            closeMobMenu()
        }
        if (!tg.closest('.catalog-filter-item')) {
            filters.forEach(item => item.classList.remove('opened'))
        }
        if (filter) {
            if (!tg.closest('.catalog-filter') && !tg.closest('.filter-mob-btn')) {
                filter.classList.remove('opened')
            }
        }
    })

})
