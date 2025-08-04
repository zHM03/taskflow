// DOM elements
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskCategory = document.getElementById("taskCategory");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");
const themeToggle = document.getElementById("themeToggle");

// Task data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Show tasks on page load
renderTasks();

// Add task
addTaskBtn.addEventListener("click", () => {
  const name = taskInput.value.trim();
  const date = taskDate.value;
  const category = taskCategory.value;

  if (!name || !date) return;

  const newTask = {
    id: Date.now(),
    name,
    date,
    category
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  taskDate.value = "";
  taskCategory.value = "General";

  renderTasks();
});

// Render tasks with optional filter (default: "All")
function renderTasks(filter = "All") {
  taskList.innerHTML = "";

  let filteredTasks = filter === "All"
    ? tasks
    : tasks.filter(task => task.category === filter);

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "<p style='text-align:center;opacity:0.6'>No tasks found.</p>";
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.innerHTML = `<strong>${task.name}</strong>
                      <span>${task.date} | ${task.category}</span>`;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actions.appendChild(deleteBtn);

    li.appendChild(meta);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Filter tasks by category
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    renderTasks(filter);
  });
});

// Toggle theme (dark/light)
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "🌙" : "☀️";
});
