// 獲取 HTML 元素
var timerDisplay = document.querySelector('#timer');
var minutesInput = document.querySelector('#minutes-input');
var startButton = document.querySelector('#start');
var stopButton = document.querySelector('#stop');
var resetButton = document.querySelector('#reset');
var setButton = document.querySelector('#set');

// 設定初始值
var minutes = parseInt(minutesInput.value);
var seconds = 0;
var countdown;

// 監聽按鈕事件
setButton.addEventListener('click', function() {
  minutes = parseInt(minutesInput.value);
  seconds = 0;
  updateTimer();
});

startButton.addEventListener('click', function() {
  countdown = setInterval(function() {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(countdown);
        return;
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    updateTimer();
  }, 1000);
});

stopButton.addEventListener('click', function() {
  clearInterval(countdown);
});

resetButton.addEventListener('click', function() {
  clearInterval(countdown);
  minutes = parseInt(minutesInput.value);
  seconds = 0;
  updateTimer();
});

// 定義計時器函式
function updateTimer() {
  var displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  var displaySeconds = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.textContent = displayMinutes + ":" + displaySeconds;
}

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

let todos = [];

function renderTodos() {
  // Clear todo list
  todoList.innerHTML = '';

  // Render each todo item
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = `
      <span class="todo-name">${todo}</span>
      <button class="delete-todo" data-index="${index}">DELETE</button>
    `;
    todoList.appendChild(todoItem);
  });
}

function addTodo() {
  const todo = todoInput.value.trim();

  if (todo) {
    todos.push(todo);
    renderTodos();
    todoInput.value = '';
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Add event listeners
todoForm.addEventListener('submit', event => {
  event.preventDefault();
  addTodo();
});

todoList.addEventListener('click', event => {
  if (event.target.classList.contains('delete-todo')) {
    const index = event.target.dataset.index;
    deleteTodo(index);
  }
});
