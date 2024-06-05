document.addEventListener("DOMContentLoaded", () => {
    fetchTasks();
});


async function fetchTasks() {
    const tasksDiv = document.getElementById("tasks");
    const response = await fetch("http://localhost:8080/api/tasks");
    const tasks = await response.json();
    tasksDiv.innerHTML = "";
    tasks.forEach(task => {
        var taskElement = document.createElement(`div`);
        taskElement.className = "task";
        var taskStatus = task.status === 'PENDING' ? 'taskPending' : 'taskCompleted'
        taskElement.innerHTML = `
                        <div id="status${task.id}" class="${taskStatus}"> <p></p></div>
                        <div id="task">
                            <span>${task.title} - ${task.status}</span>
                            <div>
                                <button onclick="updateTask(${task.id}, 'IN_PROGRESS')">In Progress</button>
                                <button onclick="updateTask(${task.id}, 'COMPLETED')">Completed</button>
                                <button onclick="deleteTask(${task.id})">Delete</button>
                            </div>
                        </div>
                    `;
        tasksDiv.appendChild(taskElement);
    });
}

async function searchForTasks(event) {
    event.preventDefault()
    const tasksDiv = document.getElementById("tasks");
    tasksDiv.innerHTML = "";
    const search = document.getElementById("statusFilter").value;
    const response = await fetch(`http://localhost:8080/api/tasks/filter/${search}`);
    const tasks = await response.json();
    tasks.forEach(task => {
        var taskElement = document.createElement(`div`);
        taskElement.className = "task";
        var taskStatus = task.status === 'PENDING' ? 'taskPending' : 'taskCompleted'
        taskElement.innerHTML = `
                        <div id="status${task.id}" class="${taskStatus}"> <p></p></div>
                        <div id="task">
                            <span>${task.title} - ${task.status}</span>
                            <div>
                                <button onclick="updateTask(${task.id}, 'IN_PROGRESS')">In Progress</button>
                                <button onclick="updateTask(${task.id}, 'COMPLETED')">Completed</button>
                                <button onclick="deleteTask(${task.id})">Delete</button>
                            </div>
                        </div>
                    `;
        tasksDiv.appendChild(taskElement);
    });
}


async function saveTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title, description, status: "PENDING"})
    }).then(function (response) {
        if (response.ok) {
            fetchTasks();
        } else {
            alert("Failed to add task");
        }
    }).catch(function (error) {
        console.error("Failed to fetch:", error);
    });
}

async function updateTask(id,status) {
    const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({status})
    }).then(response => {
        if (response.ok) {
            fetchTasks()
        } else {
            alert("Failed to update task");
        }
    });
}

async function deleteTask(id){
    const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE"
    }).then(response => {
        if (response.ok) {
            fetchTasks();
        } else {
            alert("Failed to delete task");
        }
    });
}
