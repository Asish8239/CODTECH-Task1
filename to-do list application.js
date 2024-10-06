const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const activeTaskList = document.getElementById('active-task-list');
const completedTaskList = document.getElementById('completed-task-list');

// Get tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

// Display tasks
function displayTasks() {
    activeTaskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" data-index="${index}"><i class="fas fa-trash-alt"></i> Delete</button>
            <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i> Edit</button>
            <button class="complete-btn" data-index="${index}"><i class="fas fa-check"></i> Complete</button>
        `;
        activeTaskList.appendChild(taskElement);
    });

    completedTaskList.innerHTML = '';
    completedTasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task', 'completed-task');
        taskElement.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" data-index="${index}"><i class="fas fa-trash-alt"></i> Delete</button>
        `;
        completedTaskList.appendChild(taskElement);
    });
}

// Add task
 function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        if (tasks.includes(task)) {
            alert('Task already exists!');
        } else {
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
            taskInput.value = '';
        }
    }
}

// Delete task
function deleteTask(index, isCompleted) {
    if (isCompleted) {
        completedTasks.splice(index, 1);
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    } else {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    displayTasks();
}

// Edit task
function editTask(index) {
    const task = tasks[index];
    const newTask = prompt('Enter new task:', task);
    if (newTask) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Complete task
function completeTask(index) {
    const task = tasks.splice(index, 1)[0];
    completedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    displayTasks();
}
addBtn.addEventListener('click', addTask);
activeTaskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        deleteTask(index, false);
    } else if (e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        editTask(index);
    } else if (e.target.classList.contains('complete-btn')) {
        const index = e.target.dataset.index;
        completeTask(index);
    }
});
completedTaskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        deleteTask(index, true);
    }
});
displayTasks();