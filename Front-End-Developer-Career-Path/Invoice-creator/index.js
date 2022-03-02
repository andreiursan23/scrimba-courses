const washCarBtn = document.getElementById("wash-car");
const mowLawnBtn = document.getElementById("mow-lawn");
const pullWeedsBtn = document.getElementById("pull-weeds");

const tasksContainer = document.getElementById("tasks-container");

const totalPriceEl = document.getElementById("total-price");

const sendInvoiceBtn = document.getElementById("send-invoice");

const createTaskEl = (name, value, removeBtn) => {
  return `
    <li>
      <div class="task">
        <p>${name}</p>
        <button id=${removeBtn}>Remove</button>
      </div>
      <div class="price">
        <p><span class="currency">$</span>${value}</p>
      </div>
    </li>
  `;
};

const possibleTasks = [
  {
    name: "Wash Car",
    value: 10,
    removeBtn: "remove-wash-car",
    el: createTaskEl("Wash Car", 10, "remove-wash-car"),
  },
  {
    name: "Mow Law",
    value: 20,
    removeBtn: "remove-mow-law",
    el: createTaskEl("Mow Law", 20, "remove-mow-law"),
  },
  {
    name: "Pull Weeds",
    value: 30,
    removeBtn: "remove-pull-weeds",
    el: createTaskEl("Pull Weeds", 30, "remove-pull-weeds"),
  },
];

let displayedTasks = [];

// Helper functions
const render = (tasks, tasksEl, sumEl) => {
  let sum = 0;
  tasksEl.innerHTML = "";

  tasks.forEach((task) => {
    tasksEl.innerHTML += task.el;
    sum += task.value;
  });

  sumEl.textContent = `$${sum}`;
};

// Add task actions
const addTask = (taskAdded, displayedTasks, tasksContainer, totalPriceEl) => {
  if (displayedTasks.includes(taskAdded)) {
    return;
  } else {
    displayedTasks.push(taskAdded);
    render(displayedTasks, tasksContainer, totalPriceEl);
  }
};

washCarBtn.addEventListener("click", () => {
  addTask(possibleTasks[0], displayedTasks, tasksContainer, totalPriceEl);
});

mowLawnBtn.addEventListener("click", () => {
  addTask(possibleTasks[1], displayedTasks, tasksContainer, totalPriceEl);
});

pullWeedsBtn.addEventListener("click", () => {
  addTask(possibleTasks[2], displayedTasks, tasksContainer, totalPriceEl);
});

// Remove task actions
const removeTask = (e, possibleTasks) => {
  if (e.target && e.target.id === possibleTasks.removeBtn) {
    displayedTasks = displayedTasks.filter((task) => task !== possibleTasks);
    render(displayedTasks, tasksContainer, totalPriceEl);
  }
};

document.addEventListener("click", (e) => {
  possibleTasks.forEach((task) => {
    removeTask(e, task);
  });
});

// Send invoice action (reset)
sendInvoiceBtn.addEventListener("click", () => {
  displayedTasks = [];
  totalPriceEl.textContent = "$0";
  tasksContainer.textContent = "";
});
