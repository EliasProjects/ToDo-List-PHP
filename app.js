function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    
    if (todoInput.value.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = todoInput.value;
      todoList.appendChild(li);
      todoInput.value = "";
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = function() {
        li.remove();
      };
  
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.onclick = function() {
        const newTodo = prompt("Edit todo:", li.textContent);
        if (newTodo !== null && newTodo.trim() !== "") {
          li.textContent = newTodo;
        }
      };
  
      li.appendChild(deleteBtn);
    //   li.appendChild(editBtn);
    } else {
      alert("Please enter a task!");
    }
  }
  
  function resetInput() {
    document.getElementById("todoInput").value = "";
  }
  
