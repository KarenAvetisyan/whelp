document.addEventListener('DOMContentLoaded', function(){
        /*Easy selector helper function */
        const select = (el, all = false) => {
                el = el.trim()
                if (all) {
                return [...document.querySelectorAll(el)]
                } else {
                return document.querySelector(el)
                }
        }
        /* Easy event listener function */
        const on = (type, el, listener, all = false) => {
                let selectEl = select(el, all)
                if (selectEl) {
                if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                selectEl.addEventListener(type, listener)
                }
                }
        }
        /* Easy on scroll event listener  */
        const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
        }
        
        // хедер при при скролле 
        let selectHeader = select('.header')
        if (selectHeader) {
        const headerScrolled = () => {
        if (window.scrollY > 100) {
                selectHeader.classList.add('scrolling')
        } else {
                selectHeader.classList.remove('scrolling')
        }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(window, headerScrolled)
        }
        
        // якоря
        on('click', '.scrollTo', function(e) {
                if (select(this.hash)) {
                    e.preventDefault();
                    const href = e.target.getAttribute("href");
                    const targetElement = select(href);
                    const rect = targetElement.getBoundingClientRect();
                    const offsetTop = rect.top + window.scrollY - select('.header').offsetHeight;
                    select('.navbar-collapse').classList.remove('show');
                    select('.navbar-toggler').setAttribute("aria-expanded", "false");
                    
                    scroll({
                        top: offsetTop,
                        behavior: "smooth"
                    });
                }
        }, true);
        
        //  Navbar links active state on scroll
        let navbarlinks = select('.scrollTo', true)
        const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
        } else {
                navbarlink.classList.remove('active')
        }
        })
        }
        window.addEventListener('load', navbarlinksActive)
        onscroll(document, navbarlinksActive)

        // modal 
        document.addEventListener('click', function (e) {
                if (!e.target.matches('[data-show-modal]')) return;
                e.preventDefault();
                const modal = document.querySelectorAll('#' + e.target.dataset.id);
                Array.prototype.forEach.call(modal, function (el) {
                el.classList.add('active');
                document.body.style.overflow = 'hidden';
                });
        });
        document.addEventListener('click', function (e) {
                if (!e.target.matches('[data-close-modal]')) return;
                        const modal = e.target.closest('.modal');
                        const videoElement = modal.querySelector('.modal-video'); 
                
                modal.classList.remove('active');
                document.body.style.overflow = '';
        });

        // кнопка к верх 
        let backtotop = select('#scrollToTop')
        if (backtotop) {
        const toggleBacktotop = () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backtotop.classList.add('show')
        } else {
        backtotop.classList.remove('show')
        }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
        }

        // observer, анимация на скролле 
        const inViewport = (element, observer) => {
        element.forEach(entry => {
                entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
                element.forEach(item => {
                if(item.target.classList.contains('is-inViewport') && !item.target.classList.contains('watched')){
                item.target.classList.add("watched");
                }
                })
        });
        };
        let ioConfiguration = {
        rootMargin: '0% 0% 0% 0%',
        threshold: 0.2
        };
        const Obs = new IntersectionObserver(inViewport, ioConfiguration);
        const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
        const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
        ELs_inViewport.forEach(EL => {
        Obs.observe(EL, obsOptions);
        });

})
