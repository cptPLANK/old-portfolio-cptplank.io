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

    const getBlogArticles = async () => {
        const json = await getJSON('constructor');
        const keys = Object.keys(json);
        return keys.filter(el => {
            if (json[el].template === 'blog-artikel' && typeof el === 'string') {
                return el;
            }
        });
    };

    const check404 = (location, json) => json.hasOwnProperty(location);

    const module__templateBuilder = async (template, obj) => {
        //
    };

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
        const {location, json} = await loadJasonAndLocation('constructor');
        let template = await getTemplate('header');
        if (json[location].customLogo === false) {
            template = template.replace(/{%LOGO%}/g, `cpt<span class="semi-bold uppercase">PLANK</span>`);
        } else {
            template = template.replace(/{%LOGO%}/g, json[location].customLogo);
        }
        document.querySelector('header').innerHTML = template;
    };

    const replaceTemplate = (html, obj) => {
        let template = html;
        if (obj.nameLong !== undefined) {
            template = template.replace('{%NAME_LONG%}', obj.nameLong);
        }
        if (obj.title !== undefined) {
            template = template.replace('{%TITEL%}', obj.title);
            template = template.replace('{%TITEL_ADV%}', obj.title);
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
        if (obj.text !== undefined) {
            template = template.replace('{%TEXT%}', obj.text);
        }
        if (obj.imgUrl !== undefined) {
            template = template.replace('{%IMG%}', obj.imgUrl);
        }
        if (obj.imgAlt !== undefined) {
            template = template.replace('{%IMG_ALT%}', obj.imgAlt);
        }
        if (obj.pageTitle !== undefined) {
            template = template.replace('{%BLOG_TITLE%}', obj.pageTitle);
        }
        if (obj.content.mainImg !== undefined) {
            template = template.replace('{%BLOG_MAIN_IMG%}', obj.content.mainImg);
        }
        if (obj.content.author !== undefined) {
            template = template.replace(/{%BLOG_AUTHOR%}/g, obj.content.author);
        }
        if (obj.content.authorDesc !== undefined) {
            template = template.replace('{%BLOG_AUTHOR_DESC%}', obj.content.authorDesc);
        }
        if (obj.content.authorImg !== undefined) {
            template = template.replace(/{%BLOG_AUTHOR_IMG%}/g, obj.content.authorImg);
        }
        if (obj.content.authorTwitter !== undefined) {
            template = template.replace(/{%BLOG_AUTHOR_TWITTER%}/g, obj.content.authorTwitter);
        }
        if (obj.content.minutesToRead !== undefined) {
            template = template.replace('{%TIME_TO_READ%}', obj.content.minutesToRead);
        }
        if (obj.content.inhalt !== undefined) {
            template = template.replace('{%BLOG_TEXT%}', obj.content.inhalt);
        }
        if (obj.datum !== undefined) {
            template = template.replace(/{%DATUM%}/g, obj.datum);
        }
        if (obj.content.introText !== undefined) {
            template = template.replace(/{%BLOG_SHORT_TEXT%}/g, obj.content.introText);
        }
        return template;
    };

    const builtMain = async () => {
        let output;
        const {location, json} = await loadJasonAndLocation('constructor');
        const templateName = json[location].template;
        const main = document.querySelector('main');

        if (templateName === 'case-studies') {
            const advancedTemp = await getTemplate('advanced-content-container');
            const mainTemp = await getTemplate('case-studies');
            const arrAdvanced = json[location].content.advancedContent;
            const objMain = json[location].content;
            const objSchwerpunkte = json[location].content.schwerpunkte;

            const getAdvancedContent = arrAdvanced.map(el => replaceTemplate(advancedTemp, el)).join('\n');
            const getContent = replaceTemplate(mainTemp, objMain);
            const getSchwerpunkte = objSchwerpunkte.map(el => `<li>${el}</li>`).join('\n');
            output = getContent.replace('{%SCHWERPUNKTE%}', getSchwerpunkte);
            output = output.replace('{%ADVANCED_CONTENT%}', getAdvancedContent);

            main.innerHTML = output;

        } else if (templateName === 'blog-overview') {
            const template = await getTemplate('blog-overview');
            const itemsTemplate = await getTemplate('blog-overview-item');
            const articles = await getBlogArticles();
            const builtArticleList = articles.map(el => {
                let holder = replaceTemplate(itemsTemplate, json[el]);
                holder = holder.replace('{%LINK%}', el);
                return holder;
            }).join(' ');
            console.log(builtArticleList);
            output = template.replace('{%BLOG_OVERVIEW_ITEM%}', builtArticleList);
            main.innerHTML = output;

        } else if (templateName === 'blog-artikel') {
            const template = await getTemplate('blog-artikel');
            const arrInhaltsverzeichnis = json[location].content.inhaltsverzeichnis;
            const objMain = json[location];
            const getContent = replaceTemplate(template, objMain);
            const builtInhaltsverzeichnis = arrInhaltsverzeichnis.map((el, index) => `<li><a href="#${index}">${el}</a></li>`).join('\n');
            output = getContent.replace('{%INHALTSVERZEICHNIS%}', builtInhaltsverzeichnis);

            main.innerHTML = output;

            // add blog-overview
            const articles = await getBlogArticles();
            const articleList = articles.map(el => {
                return `<li><div class="datum">${json[el].datum}</div><a href="${el}" class="art-title">${json[el].pageTitle}</a></li>`
            }).join();

            document.querySelector('.more-article > ul').innerHTML = articleList;

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

    const cpt__INIT = async () => {
        let {location, json} = await loadJasonAndLocation('constructor');

        if (check404(location, json)) {
            await builtHead();
            await builtHeader();
            await builtMain();
            await builtFooter();
            await addJSFiles();
        } else {
            alert('Die Page existiert nicht!');
        }
    };

    cpt__INIT();

}