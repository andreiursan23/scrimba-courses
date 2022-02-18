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

/*
  1. Casa si jucatorul primesc cate 2 carti
    1.1 Casa are doar a doua carte vizibila
    1.2 Jucatorul are ambele carti vizibile
  2. Jucatorul isi joaca tura
    2.1 Se poate opri dupa primirea celor 2 carti initiale
    2.2 Poate cere sa primeasca alte carti
      2.2.1 Daca suma cartilor depaseste 21, jucatorul pierde instant runda
    2.3 Cand este multumit cu suma cartilor pe care le are, apasa Stand
  3. Este aratata a doua carte a casei
  4. Daca suma cartilor casei este sub 17 este obligata sa mai traga o carte
    4.1 Daca suma cartilor casei depaseste 21, jucatorul este declarat automat castigator
  5. Se evalueaza cele doua suma si se stabileste castigatorul rundei
*/

startGameBtn.addEventListener("click", startGame);
newCardBtn.addEventListener("click", getNewCard);

function generateRandomCard() {
  const cardNumber = Math.floor(Math.random() * 13) + 1;

  if (cardNumber < 11) {
    return cardNumber;
  } else {
    return 10;
  }
}

function renderGame(cards, cardsElem, sumElem) {
  let sum = 0;
  cardsElem.textContent = "";

  cards.forEach((card) => {
    cardsElem.textContent += `${card} `;
    sum += card;
    sumElem.textContent = `${sum}`;
  });
}

function renderDealerFirstRound() {
  dealersCardsValuesEl.textContent = dealersCards[1];
  dealersCardsSumEl.textContent = dealersCards[1];
}

function dealerGame() {
  if (dealersSum < 17) {
    dealersCards.push(generateRandomCard());
    renderGame(dealersCards, dealersCardsValuesEl, dealersCardsSumEl);
  }
}

// Logica nu e corecta mai jos
function evaluateGameState(sideCardsSum) {
  if (sideCardsSum < 21) {
    return true;
  } else if (sideCardsSum === 21) {
    return true;
  } else {
    return false;
  }
}

function startGame() {
  dealersCards = [generateRandomCard(), generateRandomCard()];
  playerCards = [generateRandomCard(), generateRandomCard()];

  renderGame(playerCards, playerCardsValuesEl, playerCardsSumEl);
  renderDealerFirstRound();

  startGameBtn.disabled = true;
  newCardBtn.disabled = false;
  standBtn.disabled = false;

  gameStatusEl.textContent = "Draw a new card? Or stand down?";
}

function getNewCard() {
  playerCards.push(generateRandomCard());
  renderGame(playerCards, playerCardsValuesEl, playerCardsSumEl);
}
