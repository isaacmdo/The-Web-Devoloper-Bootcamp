const pointLeft = document.querySelector('#pointLeft');
const pointRight = document.querySelector('#pointRight');

const addScorePlayer1 = document.querySelector('#addScorePlayer1');
const addScorePlayer2 = document.querySelector('#addScorePlayer2');
const reset = document.querySelector('#reset');
const scoreSelect = document.querySelector('#playto');
const buttons = document.querySelector('.buttons');

let play1Score = 0;
let play2Score = 0;
let winningScore = 1;
let isGameOver = false;

addScorePlayer1.addEventListener('click', (e) => {
  if(!isGameOver){
    play1Score += 1
    if(play1Score === winningScore){
      isGameOver = true;
      pointLeft.classList.add('winner');
      pointRight.classList.add('loser');
    };
    pointLeft.textContent = play1Score
  }
});
   
addScorePlayer2.addEventListener('click', (e) => {
  if(!isGameOver){
    play2Score += 1
    if(play2Score === winningScore){
      isGameOver = true;
      pointRight.classList.add('winner');
      pointLeft.classList.add('loser');
    };
    pointRight.textContent = play2Score
  }
});

scoreSelect.addEventListener('change', function() {
   winningScore = parseInt(this.value);
   resetGame();
})

reset.addEventListener('click', resetGame) 


function resetGame(){
  isGameOver = false;
  play1Score = 0;
  play2Score = 0;
  pointLeft.textContent = 0;
  pointRight.textContent = 0;
  pointLeft.classList.remove('winner');
  pointRight.classList.remove('winner');
  pointLeft.classList.remove('loser');
  pointRight.classList.remove('loser');
};

