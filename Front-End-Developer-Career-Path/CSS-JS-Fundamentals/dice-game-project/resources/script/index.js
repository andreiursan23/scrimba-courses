let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let totalPlayer1Turns = 0;
let totalPlayer2Turns = 0;

const message = document.getElementById("message");
const player1Scoreboard = document.getElementById("player-1-score");
const player2Scoreboard = document.getElementById("player-2-score");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");
const player1Dice = document.getElementById("player-1-dice");
const player2Dice = document.getElementById("player-2-dice");

const getDiceValue = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const showResetBtn = () => {
  rollBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
};

const showRollBtn = () => {
  rollBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
};

rollBtn.addEventListener("click", () => {
  const diceValue = getDiceValue();

  if (player1Turn) {
    player1Dice.src = `./resources/images/dice-${diceValue}.png`;
    player1Score += diceValue;
    player1Scoreboard.textContent = player1Score;
    message.textContent = "Player 2 Turn";
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    player1Dice.classList.add("animate");
    player2Dice.classList.remove("animate");
    player2Dice.src = `./resources/images/start.png`;
    totalPlayer1Turns++;
  } else {
    player2Dice.src = `./resources/images/dice-${diceValue}.png`;
    player2Score += diceValue;
    player2Scoreboard.textContent = player2Score;
    message.textContent = "Player 1 Turn";
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    player2Dice.classList.add("animate");
    player1Dice.classList.remove("animate");
    player1Dice.src = `./resources/images/start.png`;
    totalPlayer2Turns++;
  }

  player1Turn = !player1Turn;

  if (
    player1Score >= 20 &&
    totalPlayer1Turns === totalPlayer2Turns &&
    player1Score > player2Score
  ) {
    message.textContent = "Player 1 has won! 🎉";
    player1Dice.src = `./resources/images/dice-${diceValue}.png`;
    showResetBtn();
  } else if (
    player2Score >= 20 &&
    totalPlayer1Turns === totalPlayer2Turns &&
    player2Score > player1Score
  ) {
    message.textContent = "Player 2 has won! 🎊";
    player2Dice.src = `./resources/images/dice-${diceValue}.png`;
    showResetBtn();
  }

  console.log(totalPlayer1Turns);
  console.log(totalPlayer2Turns);
});

resetBtn.addEventListener("click", () => {
  message.textContent = "Player 1 Turn";
  player1Scoreboard.textContent = 0;
  player2Scoreboard.textContent = 0;
  player1Dice.src = `./resources/images/start.png`;
  player2Dice.src = `./resources/images/start.png`;
  player2Dice.classList.remove("active");
  showRollBtn();
  player1Score = 0;
  player2Score = 0;
  player1Turn = true;
  totalPlayer1Turns = 0;
  totalPlayer2Turns = 0;
});
