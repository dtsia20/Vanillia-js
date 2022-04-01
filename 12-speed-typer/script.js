const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


// // Get a random word and displayed
function getWord() {
    fetch(`https://random-word-api.herokuapp.com/word?number=1`)
    .then(res => res.json())
    .then(data => {
		word.innerText = data[0];
        randomWord = data[0];
	})
};
getWord()


// Init word
let randomWord;

// Init Score
let score = 0;

// Inite time 
let time = 20

// difficulty 
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
// focus on text
text.focus();

// set difficulty select option 
difficultySelect.value = difficulty;
// start counting down
const timeInterval = setInterval(updateTime, 1000);

// update score
function updateScore(){
    score++;
    scoreEl.innerText = score;
}
// update time
function updateTime() {
    time--;
    timeEl.innerHTML = `${time}s`;

    if(time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}
// Game over message
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time run out</h1>
        <p> Your final score is ${score}</p>
        <button onclick="location.reload()">Play again </button>
    `
    endgameEl.style.display = 'flex'
}

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    
    if (insertedText === randomWord) {
        getWord()
        updateScore()
        // clear 
        e.target.value = '';

        if(difficulty === 'easy') {
            time += 5
        } else if (difficulty === 'medium') {
            time += 3
        } else {
            time += 2
        }

        updateTime();
    }
    
})


// Setting btn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide')
})

// Settings selects
difficultySelect.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})