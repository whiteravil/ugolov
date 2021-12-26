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

	function scrollHeader () {
        const header = document.querySelector('.header')
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

    const pannersBlock = document.querySelectorAll('.panners-block')

    pannersBlock.forEach(pannerBlock => {
        const panners = pannerBlock.querySelector('.panners')
        const pannersNavThumbs = pannerBlock.querySelector('.panners-nav-thumbs')
        const pannersNavThumb = pannerBlock.querySelectorAll('.panners-nav-thumb')
        const pannersNavPrev = pannerBlock.querySelector('.panners-prev')
        const pannersNavNext = pannerBlock.querySelector('.panners-next')

        const pannersSwiper = new Swiper(panners, {
            slidesPerView: 1,
            speed: 800,
            navigation: {
                prevEl: pannersNavPrev,
                nextEl: pannersNavNext
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        })

        const pannersNavThumbsSwiper = new Swiper(pannersNavThumbs, {
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

        pannersNavThumb.forEach((navItem, navIndex) => {
            navItem.addEventListener('click', e => {
                if (!navItem.classList.contains('active')) {
                    pannersNavThumb.forEach(item => item.classList.remove('active'))
                    navItem.classList.add('active')
                    pannersSwiper.slideTo(navIndex)
                }
            })
        })

        pannersSwiper.on('slideChange', () => {
            const index = pannersSwiper.activeIndex
            pannersNavThumbsSwiper.slideTo(index)
            pannersNavThumb.forEach((item, thumbIndex) => {
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
            e.stopPropagation()
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
        document.querySelector('.header').classList.toggle('menu-is-opened')
    })

    function closeMobMenu () {
        mobMenuBtn.classList.remove('active')
        mobMenu.classList.remove('opened')
        document.querySelector('.header').classList.remove('menu-is-opened')
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
    const galleryImg = document.querySelectorAll('.product-gallery-img')

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

        galleryImg.forEach((galleryImgItem, galleryImgIndex) => {
            galleryImgItem.addEventListener('click', () => {
                gallerySlider.slideTo(galleryImgIndex)
                openPopup('#gallery')
            })
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

            projectMap.behaviors.disable('scrollZoom')
            projectMap.behaviors.disable('multiTouch')

            const projectMapLabel = new ymaps.Placemark(coordinates, {}, {
                iconLayout: 'default#image',
                iconImageHref: 'images/dist/icons/map-marker.svg',
                iconImageSize: [42, 60],
                iconImageOffset: [-21 -30],
            })

            projectMap.geoObjects.add(projectMapLabel)
        }

        const contactsMap = document.querySelectorAll('.contacts-map-container')

        contactsMap.forEach(contactMap => {
            const contactMapCoordinates = contactMap.getAttribute('data-coordinates').split(', ').map(item => parseFloat(item))
            const contactMapObject = new ymaps.Map(contactMap, {
                center: contactMapCoordinates,
                zoom: 15,
                duration: 1000,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });

            contactMapObject.behaviors.disable('scrollZoom')
            contactMapObject.behaviors.disable('multiTouch')

            const contactMapLabel = new ymaps.Placemark(contactMapCoordinates, {}, {
                iconLayout: 'default#image',
                iconImageHref: 'images/dist/icons/map-marker.svg',
                iconImageSize: [42, 60],
                iconImageOffset: [-21 -30],
            })

            contactMapObject.geoObjects.add(contactMapLabel)
        })

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
        const roomView = document.querySelectorAll('.rooms-table-tr')

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

    const newspanners = document.querySelectorAll('.news-panners')

    newspanners.forEach(newspanner => {
        const prev = newspanner.querySelector('.panners-prev')
        const next = newspanner.querySelector('.panners-next')

        const newspannerSlider = new Swiper(newspanner, {
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
        const prev = imgSlider.querySelector('.panners-prev')
        const next = imgSlider.querySelector('.panners-next')

        const newspannerSlider = new Swiper(imgSlider, {
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
                    svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('width') + ' ' + svg.getAttribute('height'))
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

    const postContent = document.querySelector('.post-content')
    const sPartner = document.querySelector('.s-partner')
    const wrapper = document.querySelector('.wrapper')

    if (postContent || sPartner) {
        wrapper.classList.add('visible')
    }

    const accordion = document.querySelectorAll('.accordion-item')

    accordion.forEach(accordionItem => {
        const accordionItemTitle = accordionItem.querySelector('.accordion-item-header')
        const accordionItemBody = accordionItem.querySelector('.accordion-item-body')

        accordionItemTitle.addEventListener('click', () => {
            const accordionItemBodyContent = accordionItemBody.querySelector('.accordion-item-body-content')
            const accordionItemBodyContentH = accordionItemBodyContent.clientHeight

            if (accordionItemTitle.classList.contains('active')) {
                accordionItemTitle.classList.remove('active')
                accordionItemBody.style.maxHeight = '0px'
            } else {
                accordionItemTitle.classList.add('active')
                accordionItemBody.style.maxHeight = `${accordionItemBodyContentH}px`
            }

        })
    })

})
