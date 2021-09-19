const form = document.getElementById('form')
const input = document.getElementById('input')
const todosList = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if (todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
})

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const newTodo = document.createElement('li');

        if (todo && todo.completed) {
            newTodo.classList.add('completed');
        }

        newTodo.innerText = todoText;

        newTodo.addEventListener('click', () => {
            newTodo.classList.toggle('completed')

            updateLS()
        });

        newTodo.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            newTodo.remove();

            updateLS();
        })

        todosList.appendChild(newTodo);

        input.value = '';

        updateLS();
    }
}

function updateLS() {
    newTodo = document.querySelectorAll('li');

    const todos = [];

    newTodo.forEach(newTodo => {
        todos.push({
            text: newTodo.innerText,
            completed: newTodo.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}
