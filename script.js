'use strict';
// SELECTING ELEMENTS 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


/////////////////////////////////////////////
let currentScore;
let activePlayer;
let scores;
let playing;

const init = function(){
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
};
init();



const selectPlayerEl = function (player) {
    return document.querySelector(`#current--${player}`);
}

const switchPlayer = function () {
    // Switch Player
    currentScore = 0;
    selectPlayerEl(activePlayer).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};






// EVENT HANDLERS
const handleRoll = function(){
    if (!playing) return;

    // Generate random dice
    const dice = Math.trunc((Math.random() * 6) + 1);

    // Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice/dice-${dice}.png`;
    
    // Check For Roll 1
    if (dice !== 1){
        currentScore += dice;
        selectPlayerEl(activePlayer)
        .textContent = currentScore;
    } else {
        switchPlayer();
    }
};

const holdScore = function(){
    if (!playing) return;

    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 15) {
        // Finish Game
        playing = false;

        diceEl.classList.add('hidden');

        document.querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

    } else {
        switchPlayer();
    }
};


// EVENT LISTENERS
btnRoll.addEventListener('click', handleRoll);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', init);