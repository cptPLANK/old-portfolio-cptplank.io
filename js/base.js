// Header / Menu
let howMuchScrolled,
    mousePositionInPercY,
    mousePositionY,
    windowHeight,
    nav,
    burgerBtn,
    mobileCloseBtn,
    mobileHasFired,
    desktopHasFired,
    pageTransitionElement,
    askElement,
    weiterBtn,
    whichLink,
    submitBtn;

nav = document.querySelector('nav');
burgerBtn = document.querySelector('.burger-btn');
mobileCloseBtn = document.querySelector('#mobile-close-btn');
mobileHasFired = false;
desktopHasFired = false;
pageTransitionElement = document.querySelector('page-transition');
askElement = document.querySelectorAll('.ask-element');
weiterBtn = document.querySelectorAll('.ask-weiter');
submitBtn = document.querySelector('.ask-submit');
whichLink = document.querySelectorAll('.change-page-event');

const Menu = {
    closeMenu: () => {
        gsap.to(
            "nav",
            {
                duration: 1,
                y: '-100vh',
                ease: "ease"
            });
    },
    openMenu: () => {
        gsap.to(
            "nav",
            {
                duration: 2,
                y: 0,
                ease: "bounce"
            });
    },
    mouseMove: (event) => {
        event = event || window.event;

        let newMousePositionInPercY = (100 / windowHeight) * event.pageY;
        howMuchScrolled = mousePositionInPercY - newMousePositionInPercY;

        let navTranslate = 0 - parseFloat(howMuchScrolled);

        if (navTranslate <= 0) {
            gsap.to(
                "nav",
                {
                    duration: 0,
                    y: navTranslate,
                    ease: "ease"
                });
        }
    },
    finalizeCloseSlider: () => {
        document.removeEventListener('mousemove', Menu.mouseMove);
        if (howMuchScrolled >= 20) {
            Menu.closeMenu();
        }
        else if (howMuchScrolled < 20) {
            Menu.openMenu();
        }
        document.removeEventListener('mouseup', Menu.finalizeCloseSlider);
    },
    closeToTop: (event) => {
        event = event || window.event;
        mousePositionY = event.pageY;
        windowHeight = window.innerHeight;
        mousePositionInPercY = (100 / windowHeight) * mousePositionY;

        document.addEventListener('mousemove', Menu.mouseMove);
        document.addEventListener('mouseup', Menu.finalizeCloseSlider);
    },
    responsiveHandler: () => {
        if (Checks.orientation() === 'portrait') {
            // PORTRAIT
            mobileCloseBtn.addEventListener('click', Menu.closeMenu);
            if (!mobileHasFired) {
                nav.removeEventListener('mousedown', Menu.closeToTop);
                document.removeEventListener('mouseup', Menu.finalizeCloseSlider);
                mobileHasFired = true;
                desktopHasFired = false;
                Animations.cleanPlankAnimation();
            }
        }
        else {
            //LANDSCAPE
            nav.addEventListener('mousedown', Menu.closeToTop);
            if (!desktopHasFired) {
                mobileCloseBtn.removeEventListener('click', Menu.closeMenu);
                mobileHasFired = false;
                desktopHasFired = true;
                Animations.animatePlank();
            }
        }
    }
};

ScrollReveal({ reset: true });
const Animations = {
    animatePlank: () => {
        ScrollReveal().reveal('.typo-cpt', {
            distance: '50%',
            duration: 1500,
            mobile: false,
            reset: true
        });

        ScrollReveal().reveal('.typo-k', {
            rotate: {
                x: 40,
                z: 40
            },
            duration: 1500,
            mobile: false,
            reset: true
        });

        ScrollReveal().reveal('.typo-n', {
            opacity: 0,
            duration: 1500,
            mobile: false,
            reset: true
        });

        ScrollReveal().reveal('.typo-a', {
            distance: '1em',
            duration: 1500,
            mobile: false,
            reset: true
        });

        ScrollReveal().reveal('.typo-l', {
            rotate: {
                x: -40,
                y: -40,
                z: -40
            },
            duration: 1500,
            mobile: false,
            reset: true
        });

        ScrollReveal().reveal('.typo-p', {
            distance: '-1em',
            duration: 1500,
            mobile: false,
            reset: true
        });
    },
    cleanPlankAnimation: () => {
        ScrollReveal().clean('.typo-cpt, .typo-k, .typo-n, .typo-a, .typo-l, .typo-p, #portfolio h2, #arbeit-text');
    },
    basicAnimations: () => {
        ScrollReveal().reveal('.kein-designer-container h1, #untertitel, #was-ich-mache-eins, #was-ich-mache-zwei,' +
            '#ueber-mich > article > h2, #ueber-mich-text, #behance-banner a, #cs-kontakt .container, #case-studie-start' +
            ' .container, #case-studie-start .light', {
            distance: '-10%',
            duration: 1500,
            delay: 250
        });

        ScrollReveal().reveal('.kein-designer-container hr, #jahreszahl', {
            origin: 'left',
            distance: '50%',
            duration: 1500,
            delay: 250,
            reset: true
        });

        ScrollReveal().reveal('#arbeit h2', {
            origin: 'top',
            distance: '30%',
            duration: 1500,
            delay: 500
        });

        ScrollReveal().reveal('#arbeit-text', {
            origin: 'right',
            distance: '50%',
            easing: 'ease-in-out',
            scale: 2,
            duration: 1500,
            reset: true,
            delay: 250
        });

        ScrollReveal().reveal('#btn-portfolio', {
            origin: 'bottom',
            distance: '50%',
            easing: 'ease-in-out',
            duration: 1500,
            scale: 1.2,
            delay: 250
        });

        ScrollReveal().reveal('#ueber-mich > h2', {
            origin: 'top',
            distance: '50%',
            easing: 'ease-in-out',
            duration: 1500
        });

        ScrollReveal().reveal('#ueber-mich-text, #vita', {
            distance: '-5%',
            duration: 1500,
            delay: 250
        });

        ScrollReveal().reveal('#portfolio h2', {
            distance: '50%',
            origin: 'top',
            duration: 2000,
            viewFactor: 0
        });

        ScrollReveal().reveal('#portfolio ul li, #case-studie-portfolio .cs-left', {
            distance: '30%',
            origin: 'left',
            duration: 1000,
            viewFactor: 0,
            useDelay: 'onload',
            easing: 'ease-in-out',
            reset: true
        });

        ScrollReveal().reveal('#case-studie-portfolio .cs-reverse', {
            distance: '30%',
            origin: 'right',
            duration: 1000,
            viewFactor: 0,
            useDelay: 'onload',
            easing: 'ease-in-out',
            reset: true
        });
    },
    formError: () => {
        gsap.fromTo('.on', 0.1, {
            x: -10
        },{
            x: 0,
            repeat: 4,
            yoyo: true,
            ease: Quad.easeInOut
        });
        gsap.fromTo('#kontakt', 0.2, {
            backgroundColor: '#FFD24A'
        },{
            backgroundColor: 'red',
            ease: Quad.easeInOut
        });
        gsap.fromTo('#kontakt', 0.2, {
            backgroundColor: 'red'
        },{
            backgroundColor: '#FFD24A',
            ease: Quad.easeInOut
        });
    },
    link: async (finalLinkValue) => {

        await window.location.pathname = finalLinkValue;
        Animations.changePageStaggerOut();
        // if (finalLinkValue === '/#ueber-mich') {
        //     window.location.href = "/?internal=1#ueber-mich";
        // }
        // else if (finalLinkValue === '/#portfolio') {
        //     window.location.href = "/?internal=1#portfolio";
        // }
        // else {
        //     window.location.href = finalLinkValue + '?internal=1';

        // }
    },
    changePageStaggerIn: (linkValue) => {
        pageTransitionElement.style.display = 'grid';
        gsap.to('page-transition div', {
            duration: 0.7,
            width: '100%',
            stagger: 0.07,
            onComplete: () => {
                Animations.link(linkValue);
            }
            });
    },
    changePageStaggerOut: () => {
        pageTransitionElement.classList.add('page-transition-on');
        gsap.to('page-transition div', {
            delay: 0.5,
            duration: 0.5,
            width: 0,
            onComplete: () => {
                pageTransitionElement.classList.remove('page-transition-on');
            }
        });
    }
};

const Checks = {
    orientation: () => {
        if(window.innerHeight > window.innerWidth){
            return 'portrait';
        }
        else {
            return 'landscape';
        }
    },
    isPageTransitionOn: () => {
        let checkUrl = Helper.getUrlVariable('internal');
        if ( checkUrl === '1') {
            Animations.changePageStaggerOut();
            setTimeout(() => {
                let pathName = window.location.pathname;
                window.history.pushState('cptPLANK.io', 'cptPLANK.io', pathName);
            }, 1);
        }
        else {
            gsap.to('.page-transition-on', {
                duration: 0.5,
                opacity: 0,
                onComplete: () => {
                    pageTransitionElement.classList.remove('page-transition-on');
                    pageTransitionElement.removeAttribute('style');
                }
            });
        }
    },
    validEmail: (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    kontaktInput: (value) => {
        let getInput = value.childNodes[3].childNodes[1];
        let hasValue = getInput.value;
        let isRequired = getInput.hasAttribute('required');
        if (!hasValue && isRequired) {
            return true
        }
    }
};

const Helper = {
    getUrlVariable: (variable) => {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    },
    imgExists: (path) => {
            let http = new XMLHttpRequest();
            http.open('HEAD', path, false);
            http.send();

            return http.status !== 404;
    },
    kontaktNextElement: () => {
        for (let i = 0; i < askElement.length; i++) {
            if (askElement[i].classList.contains('on')) {
                let checkAttr = askElement[i].getAttribute('id');
                if (checkAttr === 'ask-email') {
                    let emailValue = document.querySelector('#ask-email-input').value;
                    if (!Checks.validEmail(emailValue)) {
                        Animations.formError();
                        break;
                    }
                }
                if (Checks.kontaktInput(askElement[i])) {
                    Animations.formError();
                    break;
                }
                askElement[i].classList.remove('on');
                askElement[i+1].classList.add('on');
                weiterBtn[i].removeEventListener('click', Helper.kontaktNextElement);
                gsap.to(askElement[i], {
                    duration: 0.7,
                    y: '20vh',
                    opacity: 0,
                    display: 'none',
                    ease: "bounce",
                    onComplete: () => {
                        askElement[i].classList.remove('ask-element-init');
                        if (i+1 < weiterBtn.length) {
                            weiterBtn[i+1].addEventListener('click', Helper.kontaktNextElement);
                        }
                        gsap.to(askElement[i+1], {
                            duration: 0.7,
                            y: 0,
                            opacity: 1,
                            display: 'block'
                        });
                    }
                });
                break;
            }
        }
    },
    sendMail: (fromEmail, subject, body) => {
        Email.send({
            SecureToken : "14c01157-fd80-4140-b852-1c34a9f86123",
            To : 'hello@cptplank.io',
            From : fromEmail,
            Subject : subject,
            Body : body
        }).then(
            gsap.to('header', 0.1, {
                display: 'none',
                onComplete: () => {
                    gsap.to('body', 1, {
                        scale: 0,
                        opacity: 0,
                        backgroundColor: '#FF9CD4',
                        onComplete: () => {
                            gsap.to('#kontakt', 0.1, {
                                display: 'none',
                                onComplete: () => {
                                    gsap.to('#mail-send', 0.1, {
                                        display: 'flex',
                                        onComplete: () => {
                                            gsap.to('#kontakt', 0.1, {
                                                scale: 1,
                                                opacity: 1,
                                                onComplete: () => {
                                                    gsap.to('#mail-send div', 2.5, {
                                                        opacity: 1
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            })
        )
    },
    sendForm: () => {
        if (Checks.kontaktInput(askElement[4])) {
            Animations.formError();
        }
        else {
            let msgName =  document.querySelector('#ask-name-input').value;
            let msgTel =  document.querySelector('#ask-tel-input').value;
            let msgCompany =  document.querySelector('#ask-firma-input').value;
            let msgMail = document.querySelector('#ask-email-input').value;
            let msgText =  document.querySelector('#ask-text-input').value;
            let msgsubject = 'cptplank.io: Formularanfrage';
            let msgBody = msgName + ' schrieb:<br>' + msgText + '<br><br>' + 'Telefon: ' + msgTel + '<br>' + 'Firma: ' + msgCompany + '<br>'
            +  'E-Mail: ' + msgMail;
            Helper.sendMail(msgMail, msgsubject, msgBody);
        }
    },
    newsletterSub: (fromEmail) => {
        Email.send({
            SecureToken : "14c01157-fd80-4140-b852-1c34a9f86123",
            To : 'hello@cptplank.io',
            From : fromEmail,
            Subject : 'cptPLANK.io Newsletter Anmeldung',
            Body : 'Neue Newsletter anmeldung von: ' + fromEmail
        });
    }
};

// Show and Hide Menu/Header
let innerHeight = window.innerHeight;
let hideAt10Perc = (innerHeight / 100) * 10;
let scrollPosition = window.scrollY;
let logo = document.querySelector('.header-logo');
let menu = document.querySelector('.burger-btn');

let toggleHeader = () => {

    if (scrollPosition > hideAt10Perc) {
        logo.classList.add('hidden');
        menu.classList.add('scrolled-menu');
    }
    else {
        logo.classList.remove('hidden');
        menu.classList.remove('scrolled-menu');

    }
};
toggleHeader();

document.addEventListener('scroll', () => {
    scrollPosition = window.scrollY;
    toggleHeader();
});


// Responsive Menü öffnen und schließen
burgerBtn.addEventListener('click', Menu.openMenu);
Menu.responsiveHandler();
window.addEventListener('resize', Menu.responsiveHandler);

// Init weitere Page Animationen
Animations.basicAnimations();
Checks.isPageTransitionOn();

// Menu Eventlistener

let menuItem = document.querySelectorAll('.menu-event');
for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener('click', Menu.closeMenu);
}

for (let i = 0; i < whichLink.length; i++) {
    let value = whichLink[i].getAttribute('href');
    whichLink[i].addEventListener('click', (e) => {
        e.preventDefault();
        Animations.changePageStaggerIn(value);
    });
}

//Kontakt Eventlistener

if (window.location.pathname === '/kontakt') {
    weiterBtn[0].addEventListener('click', Helper.kontaktNextElement);
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Helper.sendForm();
    });
    document.querySelector('form').addEventListener('keydown', (e) => {
        if(e.which === 13 || e.keyCode === 13 || e.key === 13)
            {
                e.preventDefault();
            }
    });
}

//  Newsletter

document.querySelector('#newsletter > ul > li:nth-child(3) > input[type=submit]:nth-child(2)').addEventListener('click', (e) => {
    e.preventDefault();
    let anmeldeEmail = document.querySelector('#newsletter > ul > li:nth-child(3) > input[type=email]:nth-child(1)').value;
    Helper.newsletterSub(anmeldeEmail);
    document.querySelector('#newsletter > ul > li:nth-child(3)').innerHTML = 'Danke!'
});

// Case Studie große Startgifs laden
( () => {
        let pathname = window.location.pathname;
        let whichSitePath = pathname.slice(4);
        let imgPath = './img/cs-' + whichSitePath + '-anim.gif';
        let startImg = document.querySelector('.start-img');
        if (pathname.indexOf('cs-') > -1) {
            if ( Helper.imgExists(imgPath) ) {
                let loadGif = new Image();
                loadGif.src = imgPath;
                loadGif.onload = () => {
                    startImg.setAttribute('style', 'background-image: url(' + imgPath + ');\n' +
                        'background-position: top center; background-size: cover');
                }
            }
        }
    }
)();

if (window.location.pathname === '/') {
//DIRTY
    document.querySelector('.close-cv').addEventListener('click', () => {
        document.querySelector('cv').style.display = 'none';
    });

    document.querySelector('.cv-anfordern').addEventListener('click', () => {
        document.querySelector('cv').style.display = 'flex';
    });
}
