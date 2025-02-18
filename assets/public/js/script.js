const array = ["Développeur Web", "Créatif", "Curieux", "Rigoureux", "Ambitieux"];
let span = document.getElementById('libelle-span');
let i = 0
let letter = 0;
let isDeleting = false;

const icons = [
    "icons8-html-96.png",
    "icons8-fichier-de-type-css-96.png",
    "icons8-js-96.png",
    "icons8-php-96.png",
    "icons8-mysql-96(1).png",
    "icons8-github-96.png",
    "icons8-tailwind-css-96.png",
    "icons8-bootstrap-96.png",
    "icons8-symfony-96.png"
];
const containerSkill1 = document.getElementById('container-skill-1');
const containerSkill2 = document.getElementById('container-skill-2');
const iconSize = 96;
const padding = 20;

document.addEventListener('DOMContentLoaded', function() {
    typeAndErase();
    placeSkills();
});

function typeAndErase() {
    if (!isDeleting && letter < array[i].length) {
        span.innerHTML += array[i].charAt(letter);
        letter++;
        setTimeout(typeAndErase, 100); // Timeout avant d'écrire la prochaine lettre (permets de régler la vitesse d'écriture)
    } else if (isDeleting && letter > 0) {
        span.innerHTML = array[i].substring(0, letter - 1);
        letter--;
        setTimeout(typeAndErase, 100); // Timeout pour ajuster la vitesse d'effacement
    } else if (!isDeleting && letter === array[i].length) {
        isDeleting = true;
        setTimeout(typeAndErase, 1500); // Timeout avant de commencer à effacer le mot
    } else if (isDeleting && letter === 0) {
        isDeleting = false;
        i = (i + 1) % array.length;
        setTimeout(typeAndErase, 500); // Timeout avant d'écrire le prochain mot
    }
}

function getRandomPosition(container){
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const x = Math.floor(Math.random() * (containerWidth - iconSize));
    const y = Math.floor(Math.random() * (containerHeight - iconSize));
    return {x, y};
}

function placeSkills(){
    const half = Math.ceil(icons.length / 2);
    const firstHalf = icons.slice(0, half);
    const secondHalf = icons.slice(half);

    displaySkills(containerSkill1, firstHalf);
    displaySkills(containerSkill2, secondHalf);
    return;
}

function displaySkills(container, icons){
    const maxAttempts = 100;
    let positions = [];

    icons.forEach(icon => {
        let position;
        let attempts = 0;

        do{
            position = getRandomPosition(container);
            attempts++;
        } while(isOverlapping(position, positions) && attempts < maxAttempts);
        
        if(attempts < maxAttempts){
            positions.push(position);
        
            const img = document.createElement('img');
            img.src = `/assets/public/img/icons/${icon}`;
            img.alt = `logo_${icon.split('-')[1]}`;
            img.classList.add('icon');
            img.style.position = 'absolute';
            img.style.left = `${position.x}px`;
            img.style.top = `${position.y}px`;
            container.appendChild(img);
        } else {
            console.warn(`Could not place ${icon} after ${maxAttempts} attempts`);
        }
    });
}

function isOverlapping(newPositions, existingPositions){
    return existingPositions.some(position => {
        return Math.abs(newPositions.x - position.x) < iconSize + padding &&
        Math.abs(newPositions.y - position.y) < iconSize + padding;
    })
}