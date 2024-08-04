
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) ||1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
const id = nextId;
nextId++; //when generateTaskId is called, a unique ID will be produced one higher than the last
localStorage.setItem("nextId", JSON.stringify(nextId)); //saves the updated nextId to localStorage
return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const today = dayjs().startOf('day');
  const dueDate = dayjs(task.dueDate);
  let cardColorClass = "";

  if (dueDate.isBefore(today)) {
    cardColorClass ="bg-danger text-white";
  } else if (dueDate.diff(today, 'day') <= 2) {
    cardColorClass = "bg-warning text-dark";
  }

return `
<div class="card task-card ${cardColorClass}" id="task-${task.id}">
  <div class="card-body">
    <h5 class="card-title">${task.title}</h5>
    <p class="card-text">${task.description}</p>
    <p class="card-text"><small>Due: ${task.dueDate}</small></p>
    <button class="btn btn-danger delete-task" data-id="${task.id}">Delete</button>
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

  taskList.forEach(task => {
    
    if (task.status === "To Do") {
      $("#todo-cards").append(createTaskCard(taskCard));
    } else if (task.status === "In Progress") {
      $("#in-progress-cards").append(createTaskCard(taskCard));
    } else if (task.status === "Done") {
      $("#done-cards").append(createTaskCard(taskCard));
    }
  });

  //makethe taskCard draggable
  $(".draggable").draggable({
    zIndex: 100,
    revert: "invalid",
    opacity: .5,
        helper: function(e){
            const card = $(e.target).hasClass('.ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable')
            return card.clone().css({
                width: card.outerWidth()
            })
        }
  });
}


// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault(); //stops page from reloading when we submit

  const title = $("#taskTitle").val();
  const description = $("#taskDescription").val();
  const dueDate = $("#taskDueDate").val();
  const status = "To Do"; //makes this the default status whe a task is created
  const id = generateTaskId();

  const newTask = {id, title, description, dueDate, status};

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  renderTaskList();

  $("#formModal").modal("hide"); //cloes the modal
  $("#taskForm")[0].reset(); //resets the form

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const taskId = $(event.target).data("id");

  taskList = taskList.filter(task => task.id !==taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable[0].dataset.taskId
  const newStatus = $(event.target).closest('.lane').attr("id").replace("-cards", "");

  console.log("Dropping task:", taskId, "into status", newStatus);

  taskList = taskList.map(task => {
    if (task.id === taskId) {
      console.log("Updating task:", task.id, "to new status", newStatus);
      return { ...task, status: newStatus};
    }
    return task;
  });

  console.log("Updated task list:", taskList);
  
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $(".lane .card-body").droppable({
    accept:".draggable",
    drop: handleDrop,
    tolerance: "intersect",
    hoverClass: "ui-state-hover"
  });

  $("#taskDueDate").datepicker({
    dateFormat: "dd-mm-yy"
  });

  $("#saveTaskButton").on("click", handleAddTask);

  $(document).on("click", ".delete-task", handleDeleteTask);
});
