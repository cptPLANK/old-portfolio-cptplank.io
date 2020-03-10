<section id="kontakt" class="bg-gelb">
    <h1 class="weiss">Kontakt</h1>
    <form name="kontakt-me" autocomplete="off">
        <noscript>
            <div style="padding-bottom: 5vw"><span style="color: red; font-size: 3vw;">
                Sorry!<br>Dieses Formular funktioniert nur mit aktiviertem Javascript! Möchtest du mich auf anderem Wege kontaktieren
                sende bitte eine eMail an <strong><a href="mailto:jl@cptplank.io" style="color: black">jl@cptplank.io</a></strong>.
            </span></div>
        </noscript>
        <div class="form-inner-wrapper">
            <div id="ask-name" class="ask-element ask-element-init on">
                <span>Wie soll ich dich nennen?</span>
                <div>
                    <input id="ask-name-input" type="text" required placeholder="Name__">
                </div>
                <div class="ask-weiter">Weiter</div>
            </div>
            <div id="ask-firma" class="ask-element">
                <span>Für wen arbeitest du?</span>
                <div>
                    <input id="ask-firma-input" type="text" placeholder="Firmenname__">
                </div>
                <div class="ask-weiter">Weiter</div>
            </div>
            <div id="ask-email" class="ask-element">
                <span>Wie lautet deine <nowrap>E-Mail?</nowrap></span>
                <div>
                    <input type="email" id="ask-email-input" placeholder="E-Mail__">
                </div>
                <div class="ask-weiter">Weiter</div>
            </div>
            <div id="ask-telefon" class="ask-element">
                <span>Soll ich dich anrufen?</span>
                <div>
                    <input type="tel" id="ask-tel-input" placeholder="Telefonnummer__">
                </div>
                <div class="ask-weiter">Weiter</div>
            </div>
            <div id="ask-nachricht" class="ask-element">
                <span>Wie kann ich helfen?</span>
                <div>
                    <textarea class="ask-text" id="ask-text-input" rows="1" required placeholder="Deine Nachricht__"></textarea>
                </div>
                <button type="submit" class="ask-submit">Absenden</button>
            </div>
        </div>
    </form>
</section>

<section id='mail-send'>
    <div>
        <p>Danke!<br><span class="melden">Ich melde mich.</span><br><span class="back-links"><a href="/" class="change-page-event">Start</a> | <a href="/portfolio" class="change-page-event">Case Studies</a></span></p>
    </div>
</section>