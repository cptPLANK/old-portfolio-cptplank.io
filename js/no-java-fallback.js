// Falls JavaScript deaktiviert ist bleibt der Nutzer nicht im weißen Overlay hängen
let magic = document.querySelector('body');
let magicElement = document.createElement('page-transition');
magicElement.classList.add('page-transition-on');
magic.appendChild(magicElement);
for (let i = 0; i < 10; i++) {
    let magicDiv = document.createElement('div');
    magicElement.appendChild(magicDiv);
}