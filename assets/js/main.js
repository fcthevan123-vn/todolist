let btnAddTodo = document.querySelector('.add-todo');
let contentTask = document.getElementById('content');

// Select category
let category1 = document.getElementById('category1');
let category2 = document.getElementById('category2');


let tasks = getTask();
renderTasks(tasks);


btnAddTodo.addEventListener('click', function() {
    if (!contentTask.value) {
        alert('Please select a task to add');
        return false;
    }
    let taskID = this.getAttribute('id');
    let tasks = getTask();
    let task = {name: contentTask.value}
    if (taskID == 0 || taskID) {
        tasks[taskID] = task;
        this.removeAttribute('id');
    }else{
        tasks.push(task);
    }
    contentTask.value = ''
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
});

function editTask(id) {
    let tasks = getTask();
    if (tasks.length > 0) {
        contentTask.value = tasks[id].name
        btnAddTodo.setAttribute('id', id);
    }
}

function deleteTask(id) {
    if (confirm('Are you sure to delete this task?')) {
        let tasks = getTask();
        tasks.splice(id, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(getTask());
    }
}


function renderTasks(tasks = []) {
    let content;
    tasks.forEach((task, index) => {
        content += `<div class="todo-item">
        <label>
            <input type="checkbox">
            <span class="bubble business"></span>
        </label>
        <div class="todo-content">
            <p>${task.name}</p>
        </div>
        <div class="actions">
            <button class="edit" onclick="editTask(${index})" >Edit</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
    </div>
    </div>`
    })
    document.getElementById('todo-list').innerHTML = content ;
}




function getTask() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}


