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
        template = template.replace('{%NAME_LONG%}', obj.nameLong);
        template = template.replace('{%TITEL%}', obj.title);
        template = template.replace('{%INTRO_TEXT%}', obj.introText);
        template = template.replace('{%CHALLANGE%}', obj.challange);
        template = template.replace('{%OUTCOME%}', obj.outcome);
        template = template.replace('{%TITEL_ADV%}', obj.advancedContent.title);
        template = template.replace('{%TEXT%}', obj.advancedContent.text);
        template = template.replace('{%IMG%}', obj.advancedContent.imgUrl);
        template = template.replace('{%IMG_ALT%}', obj.advancedContent.imgAlt);
        return  template;
    };

    const builtMain = async () => {
        const {location, json} = await loadJasonAndLocation('constructor');
        const templateName = json[location].template;
        const main = document.querySelector('main');

        if (templateName === 'case-studies') {
            const caseStudie = location.slice(0, 12);
            const jsonCaseStudies = await getJSON('case-studies');
            const caseStudyTemp = await getTemplate('case-studies');
            const advancedTemp = await getTemplate('advanced-content-container');
            const arrAdvanced = jsonCaseStudies[caseStudie].content.advancedContent;

            const getAdvancedContent = arrAdvanced.map(el => replaceTemplate(advancedTemp, arrAdvanced[el])).join();
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