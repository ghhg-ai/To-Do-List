function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = taskInput.value;
    li.dataset.completed = false; // Track task completion status

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        li.remove();
        updateTaskStats();
    };

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.onclick = function() {
        li.dataset.completed = "true";
        li.style.textDecoration = "line-through";
        updateTaskStats();
    };

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = "";
    updateTaskStats();
}

function updateTaskStats() {
    const taskList = document.querySelectorAll("#taskList .list-group-item");
    const totalTasks = taskList.length;
    const completedTasks = [...taskList].filter(task => task.dataset.completed === "true").length;
    const pendingTasks = totalTasks - completedTasks;

    document.getElementById("totalTasks").textContent = totalTasks;
    document.getElementById("completedTasks").textContent = completedTasks;
    document.getElementById("pendingTasks").textContent = pendingTasks;
}

function filterTasks() {
    const filterValue = document.getElementById("taskFilter").value;
    const taskList = document.querySelectorAll("#taskList .list-group-item");

    taskList.forEach(task => {
        switch (filterValue) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.dataset.completed === "true" ? "flex" : "none";
                break;
            case "pending":
                task.style.display = task.dataset.completed === "false" ? "flex" : "none";
                break;
        }
    });
}

function updateTime() {
    const currentDateTime = new Date().toLocaleString();
    document.getElementById("currentDateTime").textContent = currentDateTime;
    setTimeout(updateTime, 1000);
}

// Initialize the time display
updateTime();
