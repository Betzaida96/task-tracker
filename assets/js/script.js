
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
nextId = nextId || 1; //Initializes nextId if it's not already set
const id = nextId;
nextId++; //when generateTaskId is called, a unique ID will be produced one higher than the last
localStorage.setItem("nextId", JSON.stringify(nextId)); //saves the updated nextId to localStorage
return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
return `
<div class="card task-card" id="task-${task.id}">
  <div class="card-body">
    <h5 class="card-title">${task.title}</h5>
    <p class="card-text">${task.description}</p>
    <button class="btn btn-danger delete-task" data-id=${task.id}">DELETE</button>
  </div>
</div>
`;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
//Clear the task lanes  
$("#todo-cards").empty();
$("#in-progress-cards").empty();
$("#done-cards").empty();

//Iterate over the tasks and add them to the appropriate lane
if (taskList) {
  taskList.forEach(task => {
    const taskCard = createTaskCard(task);
    if (task.status === "To Do") {
      $("#todo-cards").append(taskCard);
    } else if (task.status === "In Progress") {
      $("#in-progress-cards").append(taskCard);
    } else if (task.status === "Done") {
      $("#done-cards").append(taskCard);
    }
  });

  //makethe taskCard draggable
  $(".task-card").draggable({
    revert: "invalid"
  });
}
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
