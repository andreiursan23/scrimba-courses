const gameStatusEl = document.getElementById("game-status");

const playerCardsValuesEl = document.getElementById("player-cards-values");
const playerCardsSumEl = document.getElementById("player-cards-sum");

const dealersCardsValuesEl = document.getElementById("dealers-cards-values");
const dealersCardsSumEl = document.getElementById("dealers-cards-sum");

const startGameBtn = document.getElementById("start-game");
const newCardBtn = document.getElementById("new-card");
const standBtn = document.getElementById("stand");

const playerTotalMoneyEl = document.getElementById("player-total-money");
const playerCurrentStakeEl = document.getElementById("player-current-stake");

const bet1El = document.getElementById("bet-1");
const bet5El = document.getElementById("bet-5");
const bet20El = document.getElementById("bet-20");
const bet50El = document.getElementById("bet-50");
const bet100El = document.getElementById("bet-100");
const allBettingBtns = document.querySelectorAll(".bet-button");

let dealersCards = [];
let playerCards = [];
let dealersSum = 0;
let playersSum = 0;
let isPlayerAlive = true;
let isDealerAlive = true;
let hasPlayerWon = false;
let hasDealerWon = false;
let hasPlayerAce = false;
let hasDealerAce = false;
let isRoundDraw = false;
let playerChips = 1000;
let currentStake = undefined;

startGameBtn.addEventListener("click", startGame);
newCardBtn.addEventListener("click", getNewCard);
standBtn.addEventListener("click", standRound);

bet1El.addEventListener("click", bet1);
bet5El.addEventListener("click", bet5);
bet20El.addEventListener("click", bet20);
bet50El.addEventListener("click", bet50);
bet100El.addEventListener("click", bet100);

renderPlayerTotalMoney();

function generateRandomCard(side) {
  const cardNumber = Math.floor(Math.random() * 13) + 1;

  if (cardNumber === 1) {
    if (side === "player") {
      hasPlayerAce = true;
    } else {
      hasDealerAce = true;
    }
    return 11;
  } else if (cardNumber < 11) {
    return cardNumber;
  } else {
    return 10;
  }
}

function changeAceValue(cards, side) {
  let index = cards.indexOf(11);

  if (index !== -1) {
    cards[index] = 1;

    if (side === "player") {
      hasPlayerAce = false;
    } else {
      hasDealerAce = false;
    }
  }
}

function updateCardsSum(side, sum) {
  if (side === "player") {
    playersSum = sum;
  } else {
    dealersSum = sum;
  }
}

function calcCardsSum(cards) {
  let sum = 0;

  cards.forEach((card) => {
    sum += card;
  });

  return sum;
}

function renderGame(cards, cardsElem, sumElem, side) {
  let sum = 0;
  cardsElem.textContent = "";

  // Sum calculated before Ace adjustment
  sum = calcCardsSum(cards);

  if (sum > 21) {
    changeAceValue(cards, side);
  }

  // Sum calculated after Ace adjustment
  sum = calcCardsSum(cards);

  updateCardsSum(side, sum);

  cards.forEach((card) => {
    cardsElem.textContent += `${card} `;
    sumElem.textContent = `${sum} `;
  });
}

function renderDealerFirstRound(cards) {
  dealersCardsValuesEl.textContent = dealersCards[1];
  dealersCardsSumEl.textContent = dealersCards[1];

  let sum = calcCardsSum(cards);

  updateCardsSum("dealer", sum);
}

function dealerGame() {
  if (dealersSum < 17) {
    dealersCards.push(generateRandomCard("dealer"));
  }

  // Sum calculated before Ace adjustment
  dealersSum = calcCardsSum(dealersCards);

  if (dealersSum > 21) {
    changeAceValue(dealersCards, "dealer");
  }

  // Sum calculated after Ace adjustment
  dealersSum = calcCardsSum(dealersCards);

  updateCardsSum("dealer", dealersSum);
}

function evaluateGameState(sideCardsSum) {
  if (sideCardsSum <= 21) {
    return true;
  } else {
    return false;
  }
}

function evaluateGameBlackjack(sideCardsSum) {
  if (sideCardsSum === 21) {
    return true;
  } else {
    return false;
  }
}

function evaluateGameWon() {
  if (playersSum === dealersSum) {
    return "draw";
  } else if (playersSum > dealersSum) {
    return true;
  } else {
    return false;
  }
}

function updateGameMessage(message) {
  gameStatusEl.textContent = `${message}`;
  gameStatusEl.classList.add("fade-in");

  setTimeout(() => {
    gameStatusEl.classList.remove("fade-in");
  }, 500);
}

function endGameSteps() {
  renderGame(dealersCards, dealersCardsValuesEl, dealersCardsSumEl, "dealer");

  updatePlayerChips();
  renderPlayerTotalMoney();

  startGameBtn.disabled = true;
  newCardBtn.disabled = true;
  standBtn.disabled = true;

  bet1El.disabled = false;
  bet5El.disabled = false;
  bet20El.disabled = false;
  bet50El.disabled = false;
  bet100El.disabled = false;

  allBettingBtns.forEach((btn) => {
    btn.classList.remove("selected");
  });

  playerCurrentStakeEl.textContent = "";
  playerCurrentStakeEl.textContent = "Place new bet";
}

function enableStartGameBtn() {
  startGameBtn.disabled = false;

  playerCurrentStakeEl.textContent = `$${currentStake}`;
}

function changePlayerTotalMoney(stake) {
  playerChips = playerChips - stake;
}

function renderPlayerTotalMoney() {
  playerTotalMoneyEl.textContent = `$${playerChips}`;
}

function bet1() {
  currentStake = 1;

  changePlayerTotalMoney(1);
  renderPlayerTotalMoney();

  bet1El.classList.add("selected");

  bet5El.setAttribute("disabled", true);
  bet20El.setAttribute("disabled", true);
  bet50El.setAttribute("disabled", true);
  bet100El.setAttribute("disabled", true);

  enableStartGameBtn();
}

function bet5() {
  currentStake = 5;

  changePlayerTotalMoney(5);
  renderPlayerTotalMoney();

  bet5El.classList.add("selected");

  bet1El.setAttribute("disabled", true);
  bet20El.setAttribute("disabled", true);
  bet50El.setAttribute("disabled", true);
  bet100El.setAttribute("disabled", true);

  enableStartGameBtn();
}

function bet20() {
  currentStake = 20;

  changePlayerTotalMoney(20);
  renderPlayerTotalMoney();

  bet20El.classList.add("selected");

  bet1El.setAttribute("disabled", true);
  bet5El.setAttribute("disabled", true);
  bet50El.setAttribute("disabled", true);
  bet100El.setAttribute("disabled", true);

  enableStartGameBtn();
}

function bet50() {
  currentStake = 50;

  changePlayerTotalMoney(50);
  renderPlayerTotalMoney();

  bet50El.classList.add("selected");

  bet1El.setAttribute("disabled", true);
  bet5El.setAttribute("disabled", true);
  bet20El.setAttribute("disabled", true);
  bet100El.setAttribute("disabled", true);

  enableStartGameBtn();
}

function bet100() {
  currentStake = 100;

  changePlayerTotalMoney(100);
  renderPlayerTotalMoney();

  bet100El.classList.add("selected");

  bet1El.setAttribute("disabled", true);
  bet5El.setAttribute("disabled", true);
  bet20El.setAttribute("disabled", true);
  bet50El.setAttribute("disabled", true);

  enableStartGameBtn();
}

function updatePlayerChips() {
  if (isRoundDraw) {
    playerChips = playerChips + currentStake;
  } else if (hasPlayerWon) {
    playerChips = playerChips + 2 * currentStake;
  } else {
    playerChips = playerChips;
  }
}

function startGame() {
  dealersCards = [generateRandomCard("dealer"), generateRandomCard("dealer")];
  playerCards = [generateRandomCard("player"), generateRandomCard("player")];

  renderGame(playerCards, playerCardsValuesEl, playerCardsSumEl, "player");
  renderDealerFirstRound(dealersCards);

  startGameBtn.disabled = true;
  newCardBtn.disabled = false;
  standBtn.disabled = false;

  hasDealerWon = evaluateGameBlackjack(dealersSum);
  hasPlayerWon = evaluateGameBlackjack(playersSum);

  if (hasPlayerWon && hasDealerWon) {
    updateGameMessage("Both sides have Blackjack! It's a tie. 😲");
    isRoundDraw = true;

    endGameSteps();
  } else if (hasPlayerWon) {
    updateGameMessage("Blackjack! You won this round! 🥇");

    endGameSteps();
  } else {
    updateGameMessage("Draw a new card? Or stand down? 🤔");
  }

  isRoundDraw = false;
}

function getNewCard() {
  playerCards.push(generateRandomCard("player"));
  renderGame(playerCards, playerCardsValuesEl, playerCardsSumEl, "player");

  isPlayerAlive = evaluateGameState(playersSum);

  if (playersSum === 21) {
    updateGameMessage("Blackjack! You won this round! 🥇");
    hasPlayerWon = true;

    endGameSteps();
  }

  if (!isPlayerAlive) {
    updateGameMessage("You lost this round! 😢");
    hasPlayerWon = false;

    endGameSteps();
  }
}

function standRound() {
  dealerGame();
  isDealerAlive = evaluateGameState(dealersSum);

  if (isDealerAlive) {
    hasPlayerWon = evaluateGameWon();

    if (hasPlayerWon === "draw") {
      updateGameMessage("It's a draw! 🤝");
      isRoundDraw = true;

      endGameSteps();
    } else if (hasPlayerWon) {
      updateGameMessage("You won this round! 🥇");
      hasPlayerWon = true;

      endGameSteps();
    } else {
      updateGameMessage("You lost this round! 😢");
      hasPlayerWon = false;

      endGameSteps();
    }
  } else {
    updateGameMessage("You won this round! 🥇");
    hasPlayerWon = true;

    endGameSteps();
  }

  isRoundDraw = false;
}
