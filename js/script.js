{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [{ content: newTaskContent }, ...tasks];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                content: tasks[taskIndex].content,
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const setAllDone = () => {
        tasks = tasks.map((task) => ({ ...task, done: true, }));
        render();
    };

    const bindToggleDoneEvents = () => {
        const doneButtonElements = document.querySelectorAll(".js-done");
        doneButtonElements.forEach((doneButtonElement, index) => {
            doneButtonElement.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindRemoveEvents = () => {
        const removeButtonElements = document.querySelectorAll(".js-remove");
        removeButtonElements.forEach((
            removeButtonElement, index) => {
            removeButtonElement.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasksList__item ${hideDoneTasks && task.done ? "tasksList__item--hidden" : ""}">
               <button class="js-done tasksList__buttonDone">
            ${task.done ? "✔" : ""}
            </button>   
            <span class="tasksList__content ${task.done ? "tasksList__content--done" : ""}
            ">
            ${task.content}</span>
            <button class="tasksList__buttonDone tasksList__buttonRemove js-remove tasksList__buttonRemove">
                   🗑
                   </button></li>`;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const bindButtonEvents = () => {
        if (tasks.length === 0) {
            return;
        }
        const hideAllDoneElement = document.querySelector(".js-hideAllDone");

        hideAllDoneElement.addEventListener("click", () => { toggleHideDone(); });

        const setAllDoneElement = document.querySelector(".js-setAllDone");

        setAllDoneElement.addEventListener("click", () => { setAllDone(); });
    };

    const renderButtons = () => {
        let htmlButtons = "";

        if (tasks.length > 0) {
            htmlButtons = `
            <button class="buttons__button js-hideAllDone">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="buttons__button js-setAllDone"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie 
        </button>
        `;
        }
        document.querySelector(".js-buttons").innerHTML = htmlButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindToggleDoneEvents();
        bindRemoveEvents();
        bindButtonEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();
        newTaskElement.value = "";
        newTaskElement.focus();

        if (newTaskContent === "") {
            return;
        }
        
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);
    };

    init();

}