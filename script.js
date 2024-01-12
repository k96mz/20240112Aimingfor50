'use strict';

// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;

  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Starging conditions
init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.src = `dice-${diceNum}.png`;
    diceEl.classList.remove('hidden');

    // activePlayer = player0.classList.contains('player--active') ? '0' : '1';

    // 3. Check for rolled 1
    if (diceNum !== 1) {
      //  Add dice to current score
      currentScore += diceNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      // let activeCurretPlayer = 'currentScore' + player;
      // どちらのプレイヤーがアクティブかを判断するために、plyaer変数作成し、そこに1と2を入れて、足し算しようとしたけど、その足し算がうまくいかない。NaNとか出る。
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current socre to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    console.log(scores);

    // if score > 100, the player win and finish game
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // hide dice
      diceEl.classList.add('hidden');

      // Inactivate Roll Dice and Hold button
      // btnRoll.disabled = true;
      // btnHold.disabled = true;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// New Game
btnNew.addEventListener('click', init);
// btnRoll.disabled = false;
// btnHold.disabled = false;
