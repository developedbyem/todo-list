window.addEventListener("load", getTasks);
const btn = document.querySelector("button");
const input = document.querySelector("input");
const taskList = document.querySelector(".task-list");

let tasks;
if (!localStorage.getItem("todo")) {
  tasks = [];
} else {
  tasks = localStorage.getItem("todo").split(",");
}

// create Tasks========================
function createTask(text) {
  const li = document.createElement("li");
  li.innerHTML = `${text}`;
  li.innerHTML += `<i class="fa-solid fa-trash-can"></i>`;

  taskList.appendChild(li);
}

// get Items from localStorage after loading page=====================
const myTasks = tasks;
function getTasks() {
  myTasks.forEach((element) => {
    createTask(element);
  });
}

// add a task==================
function addTask() {
  const task = input.value;

  if (task !== "") {
    createTask(task);

    //   empty input after creating li element and focus
    input.value = "";
    input.focus();
  }

  saveTask(task);
}

// delete a task==================
function deleteTask(e) {
  const target = e.target;
  if (target.nodeName === "I") {
    target.parentElement.remove();
    removeTask(target);
  }
  // add some styles to done taske
  if (target.nodeName === "LI") {
    e.target.classList.toggle("done");
  }
}

// add to localStorage=====================
function saveTask(text) {
  tasks.push(text);
  localStorage.setItem("todo", tasks);
}
// remove from localStorage====================
function removeTask(target) {
  const text = target.parentElement.textContent;
  let itemIndex = tasks.indexOf(text);
  tasks.splice(itemIndex, 1);
  // update localStorage after removing item
  localStorage.setItem("todo", tasks);
}
// events========================================
btn.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
