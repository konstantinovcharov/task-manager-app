const taskInput = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-button');
const taskList = document.querySelector('.task-list');
const filterOption = document.querySelector('.filter-task');

document.addEventListener('DOMContentLoaded', getTasks);
taskButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTask);

function addTask(event) {
    event.preventDefault();


    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    const newTask = document.createElement('li');
    newTask.classList.add('task-item')
    newTask.innerText = taskInput.value;
    taskDiv.appendChild(newTask);
    saveLocalTasks(taskInput.value)
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    taskDiv.appendChild(trashButton);
    taskList.appendChild(taskDiv);
    taskInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        const task = item.parentElement;
        task.classList.add('fall');
        removeLocalTasks(task);
        task.addEventListener("transitionend", function () {
            task.remove();
        })


    }

    if (item.classList[0] === "complete-btn") {
        const task = item.parentElement;
        task.classList.toggle('completed');
    }
    filterTask();
}

function filterTask(e) {
    const tasks = taskList.childNodes;
    tasks.forEach(function (task) {
        switch (filterOption.value) {
            case "all":
                task.style.display = "flex"
                break;
            case "completed":
                if (task.classList.contains("completed")) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!task.classList.contains("completed")) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    })

}

function saveLocalTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        const newTask = document.createElement('li');
        newTask.classList.add('task-item')
        newTask.innerText = task;
        taskDiv.appendChild(newTask);
        
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        taskDiv.appendChild(completedButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        taskDiv.appendChild(trashButton);
        taskList.appendChild(taskDiv);
    })
}

function removeLocalTasks(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex),1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}