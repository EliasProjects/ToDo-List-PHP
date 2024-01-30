$(document).ready(function() {
    // Load tasks from the server
    loadTasks();

    // Add task event
    $("#todo-form").submit(function(e) {
        e.preventDefault();
        addTask($("#task").val());
        $("#task").val("");
    });

    // Delete task event
    $("#task-list").on("click", "button", function() {
        deleteTask($(this).parent().attr("data-id"));
    });

    function loadTasks() {
        $.ajax({
            url: "server.php",
            method: "GET",
            dataType: "json",
            success: function(data) {
                displayTasks(data);
            }
        });
    }

    function displayTasks(tasks) {
        $("#task-list").empty();
        tasks.forEach(function(task) {
            $("#task-list").append(`
                <li data-id="${task.id}">
                    <span>${task.task}</span>
                    <button>Delete</button>
                </li>
            `);
        });
    }

    function addTask(task) {
        $.ajax({
            url: "server.php",
            method: "POST",
            data: { action: "add", task: task },
            success: function() {
                loadTasks();
            }
        });
    }

    function deleteTask(id) {
        $.ajax({
            url: "server.php",
            method: "POST",
            data: { action: "delete", id: id },
            success: function() {
                loadTasks();
            }
        });
    }
});
