let tasks = JSON.parse(
    localStorage.getItem("studentTasks")
) || [];

function saveTasks() {
    localStorage.setItem(
        "studentTasks",
        JSON.stringify(tasks)
    );
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });

    input.value = "";

    saveTasks();
    displayTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    const taskCount = document.getElementById("taskCount");

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        li.append(checkbox, span, deleteButton);
        taskList.appendChild(li);
    });

    const remaining = tasks.filter(
        task => !task.completed
    ).length;

    taskCount.textContent =
        remaining + " tasks remaining";
}

document.getElementById("taskInput")
    .addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

displayTasks();
