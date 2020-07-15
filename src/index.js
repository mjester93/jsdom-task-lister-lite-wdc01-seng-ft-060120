document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const form = document.querySelector("#create-task-form");
  const ul = document.querySelector("ul");

  const createTask = () => {
    // Getting form values
    const taskValue = document.querySelector("#new-task-description").value;
    const taskUser = document.querySelector("#user").value;
    const taskPriority = document.querySelector("#priority").value;

    const taskUserOriginal = document.querySelector("#userOriginal")["value"];
    const taskValueOriginal = document.querySelector("#descriptionOriginal")["value"];
    const taskPriorityOriginal = document.querySelector("#priorityOriginal")["value"];

    const lookupId = document.getElementById(`${taskUserOriginal}-${taskValueOriginal}-${taskPriorityOriginal}`);

    if (lookupId === null) {
      // Create a new element
      let li = document.createElement('li');
      li.id = `${taskUser}-${taskValue}-${taskPriority}`
      
      // Setting attributes
      li.setAttribute('data-user', taskUser)
      li.setAttribute('data-description',taskValue)
      li.setAttribute('data-priority', taskPriority)
      li.className = `priority-${taskPriority}`
      li.innerHTML = `${taskUser} -- ${taskValue} 
      <button class='e-button' data-description='edit-${taskValue}'>E</button>
      <button class='x-button' data-description='${taskValue}'>X</button>`;
      
      // Appending to the ul element
      ul.appendChild(li);
    } else {
      // Update the li
      let li = lookupId;

      // Setting attributes
      li.id = `${taskUser}-${taskValue}-${taskPriority}`;
      li.setAttribute('data-user', taskUser);
      li.setAttribute('data-description',taskValue);
      li.setAttribute('data-priority', taskPriority);
      li.className = `priority-${taskPriority}`
      li.innerHTML = `${taskUser} -- ${taskValue} 
      <button class='e-button' data-description='edit-${taskValue}'>E</button>
      <button class='x-button' data-description='${taskValue}'>X</button>`;
    }

    // Resetting the form value to null
    document.querySelector("#new-task-description").value = null;
    document.querySelector("#user").value = null;
    // Resetting hidden fields
    form.querySelector("#userOriginal")["value"] = "";
    form.querySelector("#descriptionOriginal")["value"] = "";
    form.querySelector("#priorityOriginal")["value"] = "";

  }

  document.addEventListener('click', function(e) {
    if (e.target.value == 'Create New Task') {
      createTask();
      // Preventing the form from doing extra stuffz
      e.preventDefault();
    }
    else if (e.target.className == 'x-button') {
      e.target.parentNode.remove();
      e.preventDefault();
    }
    else if (e.target.className == 'e-button') {
      // Select parent node
      const taskParentNode = e.target.parentNode

      // Get data attributes from node
      const taskValueOriginal = taskParentNode.getAttribute('data-description');
      const taskUserOriginal = taskParentNode.getAttribute('data-user');
      const taskPriorityOriginal = taskParentNode.getAttribute('data-priority');

      // Populate that information with values in the form
      form.querySelector("input[id='user']").value = taskUserOriginal;
      form.querySelector("input[id='new-task-description']").value = taskValueOriginal;
      form.querySelector("#userOriginal")["value"] = taskUserOriginal;
      form.querySelector("#descriptionOriginal")["value"] = taskValueOriginal;
      form.querySelector("#priorityOriginal")["value"] = taskPriorityOriginal;

      // Update the li element
      e.preventDefault();
    }
  })
});
