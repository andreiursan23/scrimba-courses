// document.getElementById("count-el").innerText = 5;

// let firstBatch = 5;
// let secondBatch = 7;

// let count = firstBatch + secondBatch;

// console.log(count);

// let myAge = 27;
// let humanDogRatio = 7;

// let myDogAge = myAge * humanDogRatio;

// console.log(myDogAge);

// let count = 5;

// count = count + 1;

// console.log(count);

// let bonusPoints = 50;
// console.log(bonusPoints);

// bonusPoints = bonusPoints + 50;
// console.log(bonusPoints);

// bonusPoints = bonusPoints - 75;
// console.log(bonusPoints);

// bonusPoints = bonusPoints + 45;
// console.log(bonusPoints);

let count = 0;
let countEl = document.getElementById("count-el");

function increment() {
  count += 1;
  // textContent is more performant than innerText, so it should be used instead of it
  // countEl.innerText = count;

  countEl.textContent = count;
}

let prevEntriesEl = document.getElementById("prev-entries");

function save() {
  if (prevEntriesEl.textContent === "Previous entries: ") {
    prevEntriesEl.textContent += ` ${count}`;
  } else {
    prevEntriesEl.textContent += ` - ${count}`;
  }

  count = 0;
  countEl.textContent = count;
}
