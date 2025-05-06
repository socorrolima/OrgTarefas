const input = document.querySelector('.tarefa-input');
const btn = document.getElementById('botao_add');
const list = document.getElementById('listaTarefas');

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function createDeleteButton(li) {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    list.removeChild(li);
    saveTasks(); // Atualiza o localStorage
  });
  return deleteBtn;
}

function createTaskElement(text, time = getCurrentTime()) {
  const li = document.createElement('li');
  li.textContent = `${text} — ${time}`;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  li.appendChild(createDeleteButton(li));
  return li;
}

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = createTaskElement(taskText);
  list.appendChild(li);

  input.value = '';
  input.focus();

  saveTasks(); // Salva no localStorage
}

// Salvar tarefas no localStorage
function saveTasks() {
  const tasks = [];
  list.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim().split(' — ')[0],
      time: li.firstChild.textContent.trim().split(' — ')[1],
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tarefas', JSON.stringify(tasks));
}

// Carregar tarefas do localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tarefas')) || [];
  tasks.forEach(task => {
    const li = createTaskElement(task.text, task.time);
    if (task.completed) li.classList.add('completed');
    list.appendChild(li);
  });
}

btn.addEventListener('click', addTask);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

loadTasks();
