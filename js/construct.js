{
    const location = window.location.pathname;

    const getJSON = async (name) => {
        const res = await fetch(`./json/${name}.json`);
        return res.json();
    };

    const getTemplate = async (template) => {
        const res = await fetch(`./templates/${template}.tpl`);
        return res.text();
    };
    const JSONConstructor = getJSON('constructor');
    const JSONHead = getJSON('head');

    const builtHead = async () => {
        const headTag = document.querySelector('head');
        const addHeadFinal = document.createElement('title');
        addHeadFinal.innerText = JSONConstructor[location].pageTitle;
        headTag.append(addHeadFinal);

        keys0.forEach(el0 => {
            JSONHead[el0].forEach(el1 => {
                const newElement = document.createElement(el0);
                const keys1 = Object.keys(el1);
                keys1.forEach(el2 => {
                    if (el1[el2] === '{%TITLE%}') {
                        newElement.setAttribute(el2, JSONConstructor[location].pageTitle);
                    } else if (el1[el2] === '{%DESCRIPTION%}') {
                        newElement.setAttribute(el2, JSONConstructor[location].pageDescription);
                    }
                    else {
                    newElement.setAttribute(el2, el1[el2])
                    }
                    headTag.append(newElement);
                });
            });
        });
    };

    const builtHeader = async () => {
        const response = await getTemplate('header');
        document.querySelector('header').innerHTML = response;
    };

    const builtMain = async () => {

        // const addFinalHead = async template => {
        //
        //     const headTag = document.querySelector('head');
        //     let addHeadFinal = document.createElement('title');
        //     addHeadFinal.innerText = json[template].pageTitle;
        //     headTag.append(addHeadFinal);
        //
        //     addHeadFinal = document.createElement('meta');
        //     addHeadFinal.setAttribute('name', 'title');
        //     addHeadFinal.setAttribute('content', json[template].pageTitle);
        //     headTag.append(addHeadFinal);
        //
        //     addHeadFinal = document.createElement('meta');
        //     addHeadFinal.setAttribute('name', 'description');
        //     addHeadFinal.setAttribute('content', json[template].pageDescription);
        //     headTag.append(addHeadFinal);
        //
        //     addHeadFinal = document.createElement('meta');
        //     addHeadFinal.setAttribute('property', 'twitter:title');
        //     addHeadFinal.setAttribute('content', json[template].pageTitle);
        //     headTag.append(addHeadFinal);
        //
        //     addHeadFinal = document.createElement('meta');
        //     addHeadFinal.setAttribute('property', 'twitter:description');
        //     addHeadFinal.setAttribute('content', json[template].pageDescription);
        //     headTag.append(addHeadFinal);
        //
        //     addHeadFinal = document.createElement('meta');
        //     addHeadFinal.setAttribute('property', 'og:description');
        //     addHeadFinal.setAttribute('content', json[template].pageDescription);
        //     headTag.append(addHeadFinal);
        //
        //     addHeadFinal = document.createElement('meta');
        //     addHeadFinal.setAttribute('property', 'og:title');
        //     addHeadFinal.setAttribute('content', json[template].pageTitle);
        //     headTag.append(addHeadFinal);
        // };

        let response = await getTemplate(JSONConstructor[location].template);
        // addFinalHead(location);
        document.querySelector('main').innerHTML = response;

        // let response;
        // switch (location) {
        //     case '/':
        //         const template = 'startpage';
        //         addFinalHead(template);
        //         response = await getTemplate('startpage');
        //         document.querySelector('main').innerHTML = response;
        //     case '/kontakt':
        //         alert('MEW');
        //     case '/case-study':
        //         response = await getTemplate('startpage');
        //         document.querySelector('main').innerHTML = response;
        // }


    };

    const builtFooter = async () => {
        const response = await getTemplate('footer');
        document.querySelector('footer').innerHTML = response;
    };

    const addJSFiles = () => {
        const one =  document.createElement('script');
        one.setAttribute('src', 'https://smtpjs.com/v3/smtp.js');
        document.querySelector('body').append(one);

        const two = document.createElement('script');
        two.setAttribute('src', 'js/base.js');
        document.querySelector('body').append(two);
    };

    (async () => {
            await builtHead();
            await builtHeader();
            await builtMain();
            await builtFooter();
            await addJSFiles();
    })();

}