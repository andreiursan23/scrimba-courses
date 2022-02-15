const greetingDisplay = document.getElementById("greeting-display");

const formEl = document.getElementById("form");

const recipientInput = document.getElementById("recipient-input");
const greetingSelect = document.getElementById("greeting-select");
const senderLabel = document.getElementById("sender-label");
const senderInput = document.getElementById("sender-input");

const newGreetingInput = document.getElementById("new-greeting");
const addGreetingBtn = document.getElementById("add-greeting");

formEl.oninput = writeGreeting;
addGreetingBtn.addEventListener("click", addCustomGreeting);

function writeGreeting() {
  // Write a function update the message in the greeting-display paragraph each time the form is updated.
  const recipientName = recipientInput.value;
  const greeting = greetingSelect.value;
  const senderName = senderInput.value;

  if (recipientName) {
    senderInput.classList.remove("hide");
    senderLabel.classList.remove("hide");
  } else {
    senderInput.classList.add("hide");
    senderLabel.classList.add("hide");
  }

  if (!recipientName && !greeting && !senderName) {
    return (greetingDisplay.textContent = "Greeting will go here");
  }

  greetingDisplay.innerHTML = `
        Dear ${recipientName},
        <br />
        <br />
        ${greeting}
        <br />
        <br />
        Love,
        <br />
        ${senderName}.
    `;
}

function addCustomGreeting() {
  const newGreeting = newGreetingInput.value;

  if (newGreeting) {
    greetingSelect.innerHTML += `<option value="${newGreeting}">${newGreeting}</option>`;
  }

  newGreetingInput.value = "Done";

  setTimeout(() => {
    newGreetingInput.value = "";
  }, 1000);
}
