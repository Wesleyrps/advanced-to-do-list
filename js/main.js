import { Task } from "./Task.js";
import { TaskList } from "./TaskList.js";
import { SmartSearch } from "./SmartSearch.js"

// Storages
const localTaskStorageKey = 'task-list';

// HTML elements
const taskForm  = document.querySelector('#to-do-form');
const taskInput = document.querySelector('#to-do-input');
const filter = document.querySelector('#filter-select');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const taskListContainer = document.querySelector('#to-do-list');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const toolbar = document.querySelector('#toolbar');
const search = document.querySelector('#search');

// Variables
let taskId;
let taskName;

// Show all tasks
const taskList = new TaskList(localTaskStorageKey);

// Search filter
const smartSearch = new SmartSearch();

// Events
taskForm.addEventListener("submit",(e) => {   
    e.preventDefault();

    const inputValue = taskInput.value;

    if(inputValue) {
        let task = new Task(inputValue, localTaskStorageKey); 
        taskList.showTasks(localTaskStorageKey);  
        taskInput.value = '';
        taskInput.focus();     
    }    
});

document.addEventListener('click',(e) => {

    const targetElement = e.target;
    const parentElement = targetElement.closest("div");

    if(parentElement && parentElement.querySelector('h4')){
        taskId = parentElement.querySelector("h4").innerText;
    }

    if(targetElement.classList.contains("finish-to-do")) {
        parentElement.classList.toggle("done");
        taskList.checkTask(localTaskStorageKey,taskId);
    }

    if(targetElement.classList.contains("remove-to-do")) {
        parentElement.remove();
        taskList.removeTask(localTaskStorageKey,taskId);
    }

    if(targetElement.classList.contains("edit-to-do")) {
        toggleForms();
        taskName = parentElement.querySelector("h3").innerText;
        editInput.value = taskName
    }

});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentValue = editInput.value

    if(currentValue) {
        taskList.updateTask(localTaskStorageKey,taskId,currentValue);
    }

    toggleForms();
    taskList.showTasks(localTaskStorageKey);
})

filter.addEventListener('change', (e) => {
    e.preventDefault();
    
    let selectedValue = filter.options[filter.selectedIndex].value
    taskList.showTasks(localTaskStorageKey, selectedValue);
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
});

search.addEventListener('input', (e) => {
    smartSearch.searchFilter(localTaskStorageKey,e)
});

const toggleForms = () => {
    editForm.classList.toggle("hide");
    taskForm.classList.toggle("hide");
    taskListContainer.classList.toggle("hide");
    toolbar.classList.toggle("hide");
};