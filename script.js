let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// save to local storage

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//add task 
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a new task");
    return;
  }

  tasks.push({
    text: taskText,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

//complete 

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

//delete task

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// edit task 

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task", task.text);

  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// show task
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""} 
          onclick="toggleComplete(${task.id})">
        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span>
      </div>
      <div class="actions">
        <span class="edit" onclick="editTask(${task.id})">Edit</span>
        <span class="delete" onclick="deleteTask(${task.id})">Delete</span>
      </div> `;

    taskList.appendChild(li);
  });
}

renderTasks();
