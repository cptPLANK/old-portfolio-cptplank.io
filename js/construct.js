{
    const getJSON = async name => {
        const res = await fetch(`./json/${name}.json`);
        return res.json();
    };

    const getTemplate = async template => {
        const res = await fetch(`./templates/${template}.tpl`);
        return res.text();
    };

    const loadJasonAndLocation = async jsonFile => {
        return {location: window.location.pathname, json: await getJSON(jsonFile)};
    };

    const check404 = (location, json) => json.hasOwnProperty(location);


    const builtHead = async () => {
        const {location, json} = await loadJasonAndLocation('constructor');
        const {json: jsonHead} = await loadJasonAndLocation('head');

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

    const replaceTemplate = async (temp, obj) => {
        let template = temp;

        if (obj.nameLong !== undefined) {
            template = template.replace('{%NAME_LONG%}', obj.nameLong);
        }
        if (obj.title !== undefined) {
            template = template.replace('{%TITEL%}', obj.title);
        }
        if (obj.introText !== undefined) {
            template = template.replace('{%INTRO_TEXT%}', obj.introText);
        }
        if (obj.challange !== undefined) {
            template = template.replace('{%CHALLANGE%}', obj.challange);
        }
        if (obj.outcome !== undefined) {
            template = template.replace('{%OUTCOME%}', obj.outcome);
        }
        if (obj.title !== undefined) {
            template = template.replace('{%TITEL_ADV%}', obj.title);
        }
        if (obj.text !== undefined) {
            template = template.replace('{%TEXT%}', obj.text);
        }
        if (obj.imgUrl !== undefined) {
            template = template.replace('{%IMG%}', obj.imgUrl);
        }
        if (obj.imgAlt !== undefined) {
            template = template.replace('{%IMG_ALT%}', obj.imgAlt);
        }
        return  template;
    };

    const builtMain = async () => {
        const {location, json} = await loadJasonAndLocation('constructor');
        const templateName = json[location].template;
        const main = document.querySelector('main');

        if (templateName === 'case-studies') {
            const advancedTemp = await getTemplate('advanced-content-container');
            const arrAdvanced = json[location].content.advancedContent;

            const getAdvancedContent = arrAdvanced.map(el => {
                replaceTemplate(advancedTemp, el).join();
                // console.log(el);
            });

            console.log(getAdvancedContent);

        } else {
            main.innerHTML = await getTemplate(templateName);
        }
    };

    const builtFooter = async () => {

        const {location, json} = await loadJasonAndLocation('constructor');

        const footer = document.querySelector('footer');
        if (json[location].hasFooter) {
            footer.innerHTML = await getTemplate('footer');
        } else {
            footer.remove();
        }
    };

    const addJSFiles = async () => {

        const {location, json} = await loadJasonAndLocation('constructor');

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
        const {location, json} = await loadJasonAndLocation('constructor');
        if (check404(location, json)) {
            await builtHead();
            await builtHeader();
            await builtMain();
            await builtFooter();
            await addJSFiles();
        } else {
            alert('Die Page existiert nicht!');
        }

    })();

}