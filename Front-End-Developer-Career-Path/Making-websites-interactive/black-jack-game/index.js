const gameStatusEl = document.getElementById("game-status");

const playerCardsValuesEl = document.getElementById("player-cards-values");
const playerCardsSumEl = document.getElementById("player-cards-sum");

const dealersCardsValuesEl = document.getElementById("dealers-cards-values");
const dealersCardsSumEl = document.getElementById("dealers-cards-sum");

const startGameBtn = document.getElementById("start-game");
const newCardBtn = document.getElementById("new-card");
const standBtn = document.getElementById("stand");

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

startGameBtn.addEventListener("click", startGame);
newCardBtn.addEventListener("click", getNewCard);
standBtn.addEventListener("click", standRound);

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

  //Sum calculated after Ace adjustment
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

  let sum = calcCardsSum(dealersCards);

  updateCardsSum("dealer", sum);
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
}

function endGameSteps() {
  renderGame(dealersCards, dealersCardsValuesEl, dealersCardsSumEl, "dealer");

  startGameBtn.disabled = false;
  newCardBtn.disabled = true;
  standBtn.disabled = true;
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

    endGameSteps();
  } else if (hasPlayerWon) {
    updateGameMessage("Blackjack! You won this round! 🥇");

    endGameSteps();
  } else {
    updateGameMessage("Draw a new card? Or stand down? 🤔");
  }
}

function getNewCard() {
  playerCards.push(generateRandomCard("player"));
  renderGame(playerCards, playerCardsValuesEl, playerCardsSumEl, "player");

  isPlayerAlive = evaluateGameState(playersSum);

  if (!isPlayerAlive) {
    updateGameMessage("You lost this round! 😢");

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

      endGameSteps();
    } else {
      updateGameMessage("You lost this round! 😢");

      endGameSteps();
    }
  } else {
    updateGameMessage("You won this round! 🥇");

    endGameSteps();
  }
}
