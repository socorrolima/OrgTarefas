const input = document.querySelector('.tarefa-input');
const btn = document.getElementById('botao_add');
const list = document.getElementById('listaTarefas');

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement('li');
  li.textContent = `${taskText} — ${getCurrentTime()}`;

  // Criar botão de apagar
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-btn';

  // Quando clicar no botão, remove a tarefa
  deleteBtn.addEventListener('click', function () {
    list.removeChild(li);
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);

  input.value = '';
  input.focus();
}

btn.addEventListener('click', addTask);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

const deleteBtn = document.createElement('button');
deleteBtn.textContent = '❌';
deleteBtn.className = 'delete-btn';
