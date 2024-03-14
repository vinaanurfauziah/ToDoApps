// 4
const todos = []; // variabel berisi array yang akan menampung object data-data Todo user.
const RENDER_EVENT = 'render-todo'; // untuk mendefinisikan Custom Event dengan nama 'render-todo'

// 5 & 7 listener dari RENDER_EVENT & event handler dari custom event RENDER_EVENT untuk menerapkan makeTodo()
document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById('todos');
  // 7   
  uncompletedTODOList.innerHTML = '';

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted) { // 11. modifikasi event listener render agar menampilkan data yang sesuai, misalnya todo yang belum dikerjakan akan diletakkan pada “Yang harus dibaca”.
        uncompletedTODOList.append(todoElement);
    }   
  }
});

// 1. listener yang akan menjalankan kode yang ada didalamnya ketika semua elemen HTML sudah dimuat menjadi DOM dengan baik.
document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
  });
});

// 2. fungsi addTodo() untuk membuat Todo
function addTodo() {
  const textTodo = document.getElementById('title').value;
  const timestamp = document.getElementById('date').value;

  const generatedID = generateId();
  const todoObject = generateTodoObject(
    generatedID,
    textTodo,
    timestamp,
    false
  );
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

// 3. fungsi data id, textTodo, timestamp & state dari fungsi generateTodoObject()
function generateId() {
  // generateId() untuk menghasilkan identitas unik pada setiap item todo
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  //generateTodoObject() untuk membuat object baru dari data ug sudah disediakan dari inputan (parameter function)
  return {
    id,
    task,
    timestamp,
    isCompleted,
  };
}

// 6. fungsi makeTodo yg terdapat title, timestamp dan check button
function makeTodo(todoObject) {
  const textTitle = document.createElement('h2'); // document.createElement() untuk membuat objek DOM, yakni elemen HTML dgn nama tag tsb
  textTitle.innerText = todoObject.task; // properti innerText untuk menyematkan konten berupa teks (tak berformat HTML) pada elemen HTML

  const textTimestamp = document.createElement('p');
  textTimestamp.innerText = todoObject.timestamp;

  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', `todo-${todoObject.id}`);

  // 8. fungsi fungsi check, uncheck dan menghapus todo.
  if (todoObject.isCompleted) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');

    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');

    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(todoObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');

    checkButton.addEventListener('click', function () {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  return container;
}

// 9. fungsi addTaskToCompleted agar fungsi check button bisa berfungsi
// fungsi ini digunakan untuk memindahkan todo dari rak “Yang harus dilakukan” ke “Yang sudah dilakukan”.
function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

// 10. fungsi findTodo untuk mencari todo dengan ID yang sesuai pada array todos
function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}
