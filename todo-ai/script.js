document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const deadlineInput = document.getElementById('deadline-input');
    const categoryInput = document.getElementById('category-input');
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const task = taskInput.value;
        const deadline = deadlineInput.value;
        const category = categoryInput.value;

        if (!task || !deadline || !category) {
            alert('모든 필드를 채워주세요!');
            return;
        }

        const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${category} - ${task} - 마감일: ${deadline} (남은 기간: ${daysLeft}일)</span>
            <button class="delete-btn">삭제</button>
            <button class="complete-btn">완료</button>
            <button class="edit-btn">수정</button>
        `;

        const deleteBtn = listItem.querySelector('.delete-btn');
        const completeBtn = listItem.querySelector('.complete-btn');
        const editBtn = listItem.querySelector('.edit-btn');

        deleteBtn.addEventListener('click', function() {
            todoList.removeChild(listItem);
            updateLocalStorage();
        });

        completeBtn.addEventListener('click', function() {
            listItem.style.textDecoration = 'line-through';
            updateLocalStorage();
        });

        editBtn.addEventListener('click', function() {
            const newTask = prompt('할 일을 수정하세요:', task);
            if (newTask) {
                listItem.querySelector('span').textContent = `${category} - ${newTask} - 마감일: ${deadline} (남은 기간: ${daysLeft}일)`;
                updateLocalStorage();
            }
        });

        todoList.appendChild(listItem);

        taskInput.value = '';
        deadlineInput.value = '';
        categoryInput.value = '';

        updateLocalStorage();
    });

    function loadTodos() {
        const tasks = JSON.parse(localStorage.getItem('todos')) || [];
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task.category} - ${task.task} - 마감일: ${task.deadline} (남은 기간: ${task.daysLeft}일)</span>
                <button class="delete-btn">삭제</button>
                <button class="complete-btn">완료</button>
                <button class="edit-btn">수정</button>
            `;

            const deleteBtn = listItem.querySelector('.delete-btn');
            const completeBtn = listItem.querySelector('.complete-btn');
            const editBtn = listItem.querySelector('.edit-btn');

            deleteBtn.addEventListener('click', function() {
                todoList.removeChild(listItem);
                updateLocalStorage();
            });

            completeBtn.addEventListener('click', function() {
                listItem.style.textDecoration = 'line-through';
                updateLocalStorage();
            });

            editBtn.addEventListener('click', function() {
                const newTask = prompt('할 일을 수정하세요:', task);
                const newDeadline = prompt('마감일을 수정하세요:', deadline);
                let newCategory = prompt('카테고리를 수정하세요:', category);
                if (newTask && newDeadline && newCategory) {
                    listItem.querySelector('span').textContent = `${newCategory} - ${newTask} - 마감일: ${newDeadline} (남은 기간: ${daysLeft}일)`;
                    updateLocalStorage();
                }
            });

            todoList.appendChild(listItem);
        });
    }

    function updateLocalStorage() {
        const todos = [];
        document.querySelectorAll('li').forEach(listItem => {
            const span = listItem.querySelector('span');
            const text = span.textContent;
            const [category, task, deadlineInfo] = text.split(' - ');
            const deadline = deadlineInfo.split(' ')[1];
            const daysLeft = deadlineInfo.split(' ')[3].replace('일)', '');
            todos.push({ category, task, deadline, daysLeft });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    loadTodos();

    document.getElementById('category-select').addEventListener('change', function() {
        const categoryInput = document.getElementById('category-input');
        if (this.value === '기타') {
            categoryInput.disabled = false;
            categoryInput.focus();
        } else {
            categoryInput.value = '';
            categoryInput.disabled = true;
        }
    });
    
});
