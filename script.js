document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add task event
    taskForm.addEventListener('submit', addTask);

    // Remove or complete task event
    taskList.addEventListener('click', modifyTask);

    function addTask(e) {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `${taskText} <button class="complete">✔</button> <button class="delete">✖</button>`;
        taskList.appendChild(taskItem);

        saveTasks();
        taskInput.value = '';
    }

    function modifyTask(e) {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
        } else if (e.target.classList.contains('complete')) {
            e.target.parentElement.classList.toggle('completed');
        }
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.childNodes[0].textContent.trim(),
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `${task.text} <button class="complete">✔</button> <button class="delete">✖</button>`;
            if (task.completed) taskItem.classList.add('completed');
            taskList.appendChild(taskItem);
        });
    }
});
