"use strict";
const form = document.querySelector(".task-form")
const listTasks = document.querySelector("#task-list");
const tasks = [];

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputNameTask = document.querySelector("#task");
    let selectPriorityTask = document.querySelector("#priority");
    let inputDeadline = document.querySelector("#deadline");
    
    const toDayDate = Date.parse(`${new Date().getFullYear()}-${+new Date().getMonth() + 1}-${new Date().getDate()}`);
    const deadlineValue = Date.parse(new Date(inputDeadline.value)) - 10800000;

    if (deadlineValue >= toDayDate && inputDeadline.value !== '' && inputNameTask.value !== '') {
        const task = {
            nameTask: inputNameTask.value,
            priorityTask: selectPriorityTask.value,
            deadlineTask: inputDeadline.value,
            done: false,
        };
    
        tasks.push(task);
        const {nameTask, priorityTask, deadlineTask} = task;
        listTasks.innerHTML += `
                <div class="task">
                    <p id="name-task">${nameTask}</p>
                    <p id="priority-task">Priority: ${priorityTask}</p>
                    <p id="deadline-task">Deadline: ${deadlineTask}</p>
                    <button id="btn-done">Mark Done</button>
                </div>
        `;
        form.reset();
    }

    const btnDone = document.querySelectorAll("#btn-done");

    btnDone.forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
            const index = tasks.indexOf(tasks[i]);
            if(i === index) {
                tasks[index].done = true;
                e.target.parentElement.style.background = "#f2f2f2"
            }
        })
    });
})