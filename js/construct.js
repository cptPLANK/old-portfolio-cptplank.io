{
    console.log(window.location.pathname);

    const getJSON = async name => {
        const res = await fetch(`./json/${name}.json`);
        return res.json();
    };

    const getTemplate = async template => {
        const res = await fetch(`./templates/${template}.tpl`);
        return res.text();
    };

    const loadJasonAndLocation = async jsonFile => {
        return {location: window.location.pathname, json: await getJSON(jsonFile)}
    };


    const builtHead = async () => {
        const [location, json] = await loadJasonAndLocation('constructor');
        const {json: jsonHead} = loadJasonAndLocation('constructor');

        //const jsonHead = await getJSON('head');
        // const json = await getJSON('constructor');

        const [pageTitle, pageDescription] = [
            json[location].pageTitle,
            json[location].pageDescription
        ];
        const headTag = document.querySelector('head');
        const addHead = document.createElement('title');
        headTag.innerHTML = '';
        addHead.innerText = pageTitle;
        headTag.append(addHead);

        const keys0 = Object.keys(jsonHead);
        keys0.forEach(el0 => {
            jsonHead[el0].forEach(el1 => {
                const newElement = document.createElement(el0);
                const keys1 = Object.keys(el1);
                keys1.forEach(el2 => {
                    if (el1[el2] === '{%TITLE%}') {
                        newElement.setAttribute(el2, pageTitle);
                    } else if (el1[el2] === '{%DESCRIPTION%}') {
                        newElement.setAttribute(el2, pageDescription);
                    }
                    else {
                    newElement.setAttribute(el2, el1[el2]);
                    }
                    headTag.append(newElement);
                });
            });
        });
    };

    const builtHeader = async () => {
        const location = window.location.pathname;
        document.querySelector('header').innerHTML = await getTemplate('header');
    };

    const builtMain = async () => {
        const location = window.location.pathname;
        const tempHTML = await getJSON('constructor');
        const templateName = tempHTML[location].template;
        console.log(templateName);
        const main = document.querySelector('main');
        if (templateName === 'case-study') {
            const jsonCaseStudies = await getJSON('case-studies');
            const caseStudyTemp = await getTemplate('case-studies');
            ////////////////
            // REPLACESCRIPT
            ////////////////
        } else {
            main.innerHTML = await getTemplate(templateName);
        }
    };

    const builtFooter = async () => {

        const location = window.location.pathname;
        const json = await getJSON('constructor');

        const footer = document.querySelector('footer');
        if (json[location].hasFooter) {
            footer.innerHTML = await getTemplate('footer');
        } else {
            footer.remove();
        }
    };

    const addJSFiles = async () => {

        const location = window.location.pathname;
        const json = await getJSON('constructor');

        const one =  document.createElement('script');
        one.setAttribute('src', 'https://smtpjs.com/v3/smtp.js');
        document.querySelector('body').append(one);

        const two = document.createElement('script');
        two.setAttribute('src', 'js/base.js');
        document.querySelector('body').append(two);

        if (json[location].customScript) {

            const foo =  document.createElement('script');
            foo.setAttribute('src', json[location].customScript);
            document.querySelector('body').append(foo);

        }
    };

    (async () => {
            await builtHead();
            await builtHeader();
            await builtMain();
            await builtFooter();
            await addJSFiles();
    })();

}