const form = document.querySelector('#task-form');
const clearBtn  = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');

// Load Event Listener
loadEventListenerAll();

// Even Listener
function loadEventListenerAll(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task Event
    form.addEventListener('submit', addTask);

    // RemoveTask Event
    taskList.addEventListener('click', removeTask);

    // Clear Task Event
    clearBtn.addEventListener('click', clearTask);

    // Filter Task Event
    filter.addEventListener('keyup', filterTasks);
}

// Get Task from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //   Create li lement
        const li = document.createElement('li');

        // Add Class
        li.className = 'collection-item';

        // Create Node and append it
        li.appendChild(document.createTextNode(task));

        // Create link Element
        link = document.createElement('a');

        // Add link Class
        link.className = 'delete-item secondary-content';

        // create textNode
        link.innerHTML = '<i class = "fa fa-remove">&times;</i>';

        // Append link to li
        li.appendChild(link);

        // Append li to ul

        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e){
  if(taskInput.value === ''){
      alert('Add a Task');
  }

//   Create Element
const li = document.createElement('li');

// Add Class
li.className = 'collection-item';

// Create Node and append it
li.appendChild(document.createTextNode(taskInput.value));

// Create link Element
link = document.createElement('a');

// Add link Class
link.className = 'delete-item secondary-content';

// create textNode
link.innerHTML = '<i class = "fa fa-remove">&times;</i>';

// Append link to li
li.appendChild(link);

// Append li to ul

taskList.appendChild(li);

// Store In Local Storage
storeTaskInLocalStorage(taskInput.value);

// Clear input
taskInput.value = '';

e.preventDefault();

}

// Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are you sure')){
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask(e){
    // Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // taskList.innerHTML = '';
    // Clear LS
    clearTasksLocalStorage();
}

// Clear Task from LS
function clearTasksLocalStorage(){
    localStorage.clear();
}

// Filter Task
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach( function (task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
  } )
  
}






