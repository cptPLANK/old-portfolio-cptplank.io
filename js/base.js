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
    weiterBtn;

nav = document.querySelector('nav');
burgerBtn = document.querySelector('.burger-btn');
mobileCloseBtn = document.querySelector('#mobile-close-btn');
mobileHasFired = false;
desktopHasFired = false;
pageTransitionElement = document.querySelector('page-transition');
askElement = document.querySelectorAll('.ask-element');
weiterBtn = document.querySelectorAll('.ask-weiter');

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
            '#ueber-mich > article > h2, #ueber-mich-text', {
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

        ScrollReveal().reveal('#portfolio ul li', {
            distance: '30%',
            origin: 'left',
            duration: 1000,
            viewFactor: 0,
            useDelay: 'onload',
            easing: 'ease-in-out',
            reset: true
        });
    },
    kontaktNextElement: () => {
        for (let i = 0; i < askElement.length; i++) {
            if (askElement[i].classList.contains('on')) {
                askElement[i].classList.remove('on');
                askElement[i+1].classList.add('on');
                weiterBtn[i].removeEventListener('click', Animations.kontaktNextElement);
                gsap.to(askElement[i], {
                    duration: 0.7,
                    y: '20vh',
                    opacity: 0,
                    display: 'none',
                    ease: "bounce",
                    onComplete: () => {
                        askElement[i].classList.remove('ask-element-init');
                        if (i+1 < weiterBtn.length) {
                            weiterBtn[i+1].addEventListener('click', Animations.kontaktNextElement);
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
    link: () => {
            window.location.href = "kontakt.html?internal=1"; //////// SCRIPT ZUM VERLINKEN SCHREIBEN!!!!
    },
    changePageStaggerIn: () => {
        pageTransitionElement.style.display = 'grid';

        gsap.to('page-transition div', {
            duration: 0.7,
            width: '100%',
            stagger: 0.07,
            onComplete: Animations.link
            });
    },
    changePageStaggerOut: () => {
        pageTransitionElement.classList.add('page-transition-on');
        gsap.to('page-transition div', {
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
    isInternetExplorer: function() {
        let ua = navigator.userAgent;
        return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
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
            let pathName = window.location.pathname;
            window.history.pushState('cptPLANK.io', 'cptPLANK.io', pathName);
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
    }
};

// Show and Hide Menu/Header
let innerHeight = window.innerHeight;
let hideAt40Perc = (innerHeight / 100) * 40;
let scrollPosition = window.scrollY;
let logo = document.querySelector('.header-logo');
let menu = document.querySelector('.burger-btn');

let toggleHeader = () => {

    if (scrollPosition > hideAt40Perc) {
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

let menuItem = document.querySelectorAll('.menuEvent');
for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener('click', Menu.closeMenu);
}

document.querySelector('.testIt').addEventListener('click', Animations.changePageStaggerIn);


//Kontakt Eventlistener

weiterBtn[0].addEventListener('click', Animations.kontaktNextElement);



//////////////////////////////////////// EXTERNE SKRIPTE //////////////////////////////////////////////////////////////

// AUTOSIZE by Jack Moore (http://www.jacklmoore.com/autosize/)

/*!
	autosize 4.0.2
	license: MIT
	http://www.jacklmoore.com/autosize
*/
!function(e,t){if("function"==typeof define&&define.amd)define(["module","exports"],t);else if("undefined"!=typeof exports)t(module,exports);else{var n={exports:{}};t(n,n.exports),e.autosize=n.exports}}(this,function(e,t){"use strict";var n,o,p="function"==typeof Map?new Map:(n=[],o=[],{has:function(e){return-1<n.indexOf(e)},get:function(e){return o[n.indexOf(e)]},set:function(e,t){-1===n.indexOf(e)&&(n.push(e),o.push(t))},delete:function(e){var t=n.indexOf(e);-1<t&&(n.splice(t,1),o.splice(t,1))}}),c=function(e){return new Event(e,{bubbles:!0})};try{new Event("test")}catch(e){c=function(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!1),t}}function r(r){if(r&&r.nodeName&&"TEXTAREA"===r.nodeName&&!p.has(r)){var e,n=null,o=null,i=null,d=function(){r.clientWidth!==o&&a()},l=function(t){window.removeEventListener("resize",d,!1),r.removeEventListener("input",a,!1),r.removeEventListener("keyup",a,!1),r.removeEventListener("autosize:destroy",l,!1),r.removeEventListener("autosize:update",a,!1),Object.keys(t).forEach(function(e){r.style[e]=t[e]}),p.delete(r)}.bind(r,{height:r.style.height,resize:r.style.resize,overflowY:r.style.overflowY,overflowX:r.style.overflowX,wordWrap:r.style.wordWrap});r.addEventListener("autosize:destroy",l,!1),"onpropertychange"in r&&"oninput"in r&&r.addEventListener("keyup",a,!1),window.addEventListener("resize",d,!1),r.addEventListener("input",a,!1),r.addEventListener("autosize:update",a,!1),r.style.overflowX="hidden",r.style.wordWrap="break-word",p.set(r,{destroy:l,update:a}),"vertical"===(e=window.getComputedStyle(r,null)).resize?r.style.resize="none":"both"===e.resize&&(r.style.resize="horizontal"),n="content-box"===e.boxSizing?-(parseFloat(e.paddingTop)+parseFloat(e.paddingBottom)):parseFloat(e.borderTopWidth)+parseFloat(e.borderBottomWidth),isNaN(n)&&(n=0),a()}function s(e){var t=r.style.width;r.style.width="0px",r.offsetWidth,r.style.width=t,r.style.overflowY=e}function u(){if(0!==r.scrollHeight){var e=function(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push({node:e.parentNode,scrollTop:e.parentNode.scrollTop}),e=e.parentNode;return t}(r),t=document.documentElement&&document.documentElement.scrollTop;r.style.height="",r.style.height=r.scrollHeight+n+"px",o=r.clientWidth,e.forEach(function(e){e.node.scrollTop=e.scrollTop}),t&&(document.documentElement.scrollTop=t)}}function a(){u();var e=Math.round(parseFloat(r.style.height)),t=window.getComputedStyle(r,null),n="content-box"===t.boxSizing?Math.round(parseFloat(t.height)):r.offsetHeight;if(n<e?"hidden"===t.overflowY&&(s("scroll"),u(),n="content-box"===t.boxSizing?Math.round(parseFloat(window.getComputedStyle(r,null).height)):r.offsetHeight):"hidden"!==t.overflowY&&(s("hidden"),u(),n="content-box"===t.boxSizing?Math.round(parseFloat(window.getComputedStyle(r,null).height)):r.offsetHeight),i!==n){i=n;var o=c("autosize:resized");try{r.dispatchEvent(o)}catch(e){}}}}function i(e){var t=p.get(e);t&&t.destroy()}function d(e){var t=p.get(e);t&&t.update()}var l=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?((l=function(e){return e}).destroy=function(e){return e},l.update=function(e){return e}):((l=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return r(e)}),e}).destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e},l.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],d),e}),t.default=l,e.exports=t.default});

autosize(document.querySelector('.ask-text'));