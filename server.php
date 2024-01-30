<?php

$servername = "elias_localhost";
$username = "myproject_elias";
$password = "Elias76_chasacademy2023";
$dbname = "Elias_chas_xzmap";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if action is set and perform corresponding action
if (isset($_POST["action"])) {
    switch ($_POST["action"]) {
        case "add":
            addTask($conn);
            break;
        case "delete":
            deleteTask($conn);
            break;
        default:
            break;
    }
}

// Function to add a new task
function addTask($conn) {
    if (isset($_POST["task"])) {
        $task = $_POST["task"];
        $stmt = $conn->prepare("INSERT INTO tasks (task) VALUES (?)");
        $stmt->bind_param("s", $task);
        $stmt->execute();
        $stmt->close();
    }
}

// Function to delete a task
function deleteTask($conn) {
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
    }
}

// Fetch all tasks from the database
$sql = "SELECT id, task FROM tasks";
$result = $conn->query($sql);
$tasks = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tasks[] = array("id" => $row["id"], "task" => $row["task"]);
    }
}

// Output tasks as JSON
echo json_encode($tasks);

$conn->close();
?>
