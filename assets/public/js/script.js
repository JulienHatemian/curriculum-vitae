const array = ["Développeur Web", "Créatif", "Curieux", "Rigoureux", "Ambitieux"];
let span = document.getElementById('libelle-span');
let i = 0
let letter = 0;
let isDeleting = false;

document.addEventListener('DOMContentLoaded', function() {
    typeAndErase();
});

// function printStringByLetter(index){
//     let i=0;
//     let intervalId = setInterval(function(){
//         span.innerHTML += array[index].charAt(i);
//         i++;
//         if(i === array[index].length){
//             clearInterval(intervalId);
//         }
//     }, 50);
// }

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