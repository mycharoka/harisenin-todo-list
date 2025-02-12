const taskInput = document.getElementById("taskInput");
const priorityOption = document.getElementById("priority");
const addButton = document.getElementById("addButton");
const dateInput = document.getElementById("date");
const deleteAllButton = document.getElementById("deleteAllButton");
const taskDoneList = document.getElementById("taskDone");

window.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  // dateInput.value = `${year}-${month}-${day}` 
  const formattedDate = `${year}-${month}-${day}`;
  // const displayDate = `${day}/${month}/${year}`
  dateInput.value = formattedDate
})


addButton.addEventListener("click", processInput)
taskInput.addEventListener('keypress', event => {
  if (event.key === 'enter' || event.key === 'Enter') {
    processInput()
  }
})

let tasks = []
let completedTasks = []
function processInput() {
  // console.log('process input', taskInput.value)
  const inputText = taskInput.value.trim();
  // console.log('input text >> ', inputText)
  const priorityValue = priorityOption.value;
  const dateValue = dateInput.value;
  // console.log('date value >> ', dateValue)
  // console.log('priority value >> ', priorityValue)
  if (inputText) {
    console.log('ada isinya')
    const createTask = {
      inputText, 
      priorityValue, 
      dateValue, 
      completed: false
    }
    tasks.push(createTask)
    // console.log('tasks list >> ', tasks)
    renderInput(createTask);
    taskInput.value = ""
  } else {
    console.log('gaada')
    alert('Jangan kosong ngapa si')
  }
}

function taskCompleted(index) {
  console.log('item >> ', tasks[index].completed)
  // tasks[index].completed = !tasks[index].completed
  tasks[index].completed = true
  completedTasks.push(tasks[index])
  tasks.splice(index, 1)
  
  renderInput()
  renderTaskCompleted()
}

function renderInput() {
  const taskList = document.getElementById('taskList');
  // console.log('taskks> ', tasks)
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    // console.log('task >> ', task, index)
    const createList = document.createElement('li');
    createList.innerHTML = `
      <h1>${task.inputText}</h1>
      <p>${task.priorityValue}</p>
      <p>${task.dateValue}</p>
      <input type="checkbox" ${task.completed ? 'checked' : ''}/>
      <button onclick= "deleteTask(${index})">Delete</button>
    `
    createList.addEventListener('change', () => taskCompleted(index))
    taskList.appendChild(createList)
  })

  // const createList = document.createElement('li');
  // const checkbox = document
  // createList.innerHTML = `
  //   h1 {
  //   }
  // `


}

function renderTaskCompleted() {
  taskDoneList.innerHTML = ""

  completedTasks.forEach((task, index) => {
    const createList = document.createElement('li');
    createList.innerHTML = `
      <h1 class="strikethrough">${task.inputText}</h1>
      <p>${task.priorityValue}</p>
      <p>${task.dateValue}</p>
      <button onclick= "deleteCompletedTask(${index})">Delete</button>
    `
    taskDoneList.appendChild(createList)
  })
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderInput()
}

function deleteAllTask() {
  tasks = []
  completedTasks = []
  const taskList = document.getElementById('taskList');
  const taskListDone = document.getElementById('taskDone');
  taskList.innerHTML = '';
  taskListDone.innerHTML = '';
}

function deleteCompletedTask(index) {
  completedTasks.splice(index, 1);
  renderTaskCompleted()
}

deleteAllButton.addEventListener("click", deleteAllTask)
