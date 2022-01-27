const words_el = document.getElementById('word');
const popupContainer = document.getElementById('popup-container');
const popup = document.querySelector('.popup');
const successMessage = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgain = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];

let selectedWord = getRandomWord();

function getRandomWord() {
    const words = ['kitab', 'musiqi', 'oyun', 'bürc', 'çəmənlik', 'bağça', 'bulud', 'insan', 'kompüter', 'lənkəran', 'limon', 'nağıl', 'kitabxana', 'sarmaşıq', 'qəzəl', 'rəssam', 'tapmaca', 'telefon', 'günəş', 'avstraliya', 'saatsaz', 'köynək', 'azadqasımzadə', 'futbol', 'şirniyyat', 'panda', 'zürafə', 'təyyarə', 'çəmənlik', 'əsgər'];
    return words[Math.floor(Math.random() * words.length)];
}

displayWord();

function displayWord() {
    words_el.innerHTML = `
        ${selectedWord.split('').map(letter=>`
        <div class="letter">
        ${correctLetters.includes(letter)? letter : ''}
        </div>
        `).join('')}
    `;
    const w = words_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popupContainer.style.display = "flex";
        popup.style.backgroundColor = "rgba(255,255,0,0.5)";
        successMessage.innerHTML = "Təbriklər! <br> Oyunu qazandınız!";
    }
}
windowKeydown();
function windowKeydown() {
    window.addEventListener('keydown', (e) => {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            let letter = e.key;
            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                } else {
                    displayMessage();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLetters();
                } else {
                    displayMessage();
                }
            }
        } else if (e.keyCode == 219 || e.keyCode == 221 || e.keyCode == 192 || e.keyCode == 186 || e.keyCode == 188 || e.keyCode == 190) {
            let letter = e.key;
            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                } else {
                    displayMessage();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLetters();
                } else {
                    displayMessage();
                }
            }
        }
    });
};

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
    ${wrongLetters.length>0 ? '<h3>Yanlış Hərflər:</h3>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
    if (wrongLetters.length === items.length) {
        popupContainer.style.display = "flex";
        popup.style.backgroundColor = "rgba(255,0,0,0.3)";
        successMessage.innerText = "Oyunu uduzdunuz!";
    }

}

playAgain.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popupContainer.style.display = "none";
});

function displayMessage() {
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
    }, 2000);
}