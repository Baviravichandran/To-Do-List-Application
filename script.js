// When page opens, load old tasks if available otherwise startswith emptylist 

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load task counter

let taskCounter = Number(localStorage.getItem("taskCounter")) || 1;

// Save tasks 

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("taskCounter", taskCounter);
}

// Adds a new task to the list, saves it, and updates the display
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    id: taskCounter, 
    text: taskText,
    completed: false
  });

  taskCounter++;        
  taskInput.value = "";

  saveTasks();
  renderTasks();
}

// Toggles the completed status of a task and updates the list

function toggleComplete(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
      break;
    }
  }
  saveTasks();
  renderTasks();
}

// Removes the selected task and updates the list

function deleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      break;
    }
  }
  saveTasks();
  renderTasks();
}

// Edits the selected task and updates the list

function editTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      let newText = prompt("Edit the task", tasks[i].text);

      if (newText !== null && newText.trim() !== "") {
        tasks[i].text = newText.trim();
      }
      break;
    }
  }
  saveTasks();
  renderTasks();
}

// Displays all tasks with edit, delete, and complete options
function renderTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let li = document.createElement("li");

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox"
          ${task.completed ? "checked" : ""}
          onclick="toggleComplete(${task.id})">

        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span>
      </div>

      <div class="actions">
        <span class="edit" onclick="editTask(${task.id})">Edit</span>
        <span class="delete" onclick="deleteTask(${task.id})">Delete</span>
      </div>`;

    taskList.appendChild(li);
  }
}

renderTasks();
