//On page load, read the localStorage and display all the tasks
document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  //read tasks from localStorage if present or its an empty array if nothing is present in the localStorage
  let tasks = JSON.parse(localStorage.getItem("taskList")) || [];

  tasks.forEach((task) => renderTask(task)); //ForEach loop runs on every element and here the element is called 'task'(it can be called anything) and render the tasks

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks(); //Adding to localStorage
    renderTask(newTask);
    todoInput.value = ""; //clear input
  });

  //--------------------How to add tasks to localstorage. ---------------------------
  // Browser provides an API called Localstorage. You can add new tasks into localstorage using setItem()
  //The setItem function takes 2 parameters(key, value)
  // The key can be called anything, here its called 'taskList' and the value must be a string, so our array "tasks" is converted to string using JSON.stringify
  function saveTasks() {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }

  //-------------------------How to read the tasks from LocalStorage----------------------
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `<span>${task.text}</span><button>delete</button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    //When clicked on delete
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //Prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }
});
