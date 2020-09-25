    <article class="blog-article">
        <div class="container">
            <h1 class="bold">{%BLOG_TITLE%}</h1>
            <h2 class="author">
          <span class="box" itemprop="author" itemscope="" itemtype="http://schema.org/Person">
            <meta itemprop="url" content="https://cptplank.io/">
              <img class="author-img" src="{%BLOG_AUTHOR_IMG%}" alt="{%BLOG_AUTHOR%} profile image">
              <span itemprop="name">{%BLOG_AUTHOR%}</span>
          </span>
                <a href="{%BLOG_AUTHOR_TWITTER%}"><img class="icon-img" alt="twitter logo" src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/twitter-logo-42be7109de07f8c991a9832d432c9d12ec1a965b5c0004bca9f6aa829ae43209.svg"></a>
                <time>{%DATUM%}</time>
                <span class="published-at">・{%TIME_TO_READ%} Minuten Lesezeit</span>
            </h2>
            <img src="{%BLOG_MAIN_IMG%}" />
            <div class="article-text">
                <ul class="inhaltsverzeichnis">
                   <li>Inhaltsverzeichnis</li>
                    {%INHALTSVERZEICHNIS%}
                </ul>
                {%BLOG_TEXT%}
            </div>
            <div class="about-the-author">
                <div class="left-column">
                        <img class="profile-pic" src="{%BLOG_AUTHOR_IMG%}" alt="{%BLOG_AUTHOR%}">
                </div>
                <div class="main-content">
                    <h4>{%BLOG_AUTHOR%}</h4>
                    <p>{%BLOG_AUTHOR_DESC%}</p>
                </div>
            </div>
        </div>
    </article>
    <div class="more-article">
        <ul></ul>
    </div>