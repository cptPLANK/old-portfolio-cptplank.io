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
        gsap.fromTo('body', 0.2, {
            backgroundColor: '#FFD24A'
        },{
            backgroundColor: 'red',
            ease: Quad.easeInOut
        });
        gsap.fromTo('body', 0.2, {
            backgroundColor: 'red'
        },{
            backgroundColor: '#FFD24A',
            ease: Quad.easeInOut
        });
    },
    link: (finalLinkValue) => {
        if (finalLinkValue === '/#ueber-mich') {
            window.location.href = "/?internal=1#ueber-mich";
        }
        else if (finalLinkValue === '/#portfolio') {
            window.location.href = "/?internal=1#portfolio";
        }
        else {
            window.location.href = finalLinkValue + '?internal=1';
        }
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
    isMobile: () => {
        let isMobile = false;
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
            isMobile = true;
        }
        return isMobile;
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
            http.open('HEAD', path, true);
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
                                            gsap.to('body', 0.1, {
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

/*
if (window.location.pathname === '/cptplank-case-study') {
    let startImg = document.querySelector('.start-img');
    let loadGif = new Image();
    loadGif.src = './img/cs-cptplank-anim.gif';

    loadGif.onload = () => {
        startImg.setAttribute('style', 'background-image: url(./img/cs-cptplank-anim.gif);\n' +
            'background-position: top center; background-size: cover');
    }
}

 */

( () => {
        let pathname = window.location.pathname;
        let startImg = document.querySelector('.start-img');
        if (pathname.indexOf('-case-study') > -1) {
            let loadGif = new Image();
            let whichSitePath = pathname.slice(0, -11).substring(1);
            let imgPath = './img/cs-' + whichSitePath + '-anim.gif';
            loadGif.src = imgPath;
            if ( Helper.imgExists(imgPath) ) {
                loadGif.onload = () => {
                    startImg.setAttribute('style', 'background-image: url(' + imgPath + ');\n' +
                        'background-position: top center; background-size: cover');
                }
            }
        }
    }
)();