const todos = []; // variabel berisi array yang akan menampung object data-data Todo user.
const RENDER_EVENT = 'render-todo'; // untuk mendefinisikan Custom Event dengan nama 'render-todo'

// listener dari RENDER_EVENT
document.addEventListener(RENDER_EVENT, function () {
  console.log(todos);
});

// listener yang akan menjalankan kode yang ada didalamnya ketika semua elemen HTML sudah dimuat menjadi DOM dengan baik.
document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
  });
});

// fungsi addTodo() untuk membuat Todo
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

// fungsi data id, textTodo, timestamp & state dari fungsi generateTodoObject()
function generateId() { // generateId() untuk menghasilkan identitas unik pada setiap item todo
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
