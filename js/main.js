import { Task } from "./Task.js";
import { TaskList } from "./TaskList.js";
import { SmartSearch } from "./SmartSearch.js"
import { Title } from "./Title.js";

// Storages
const userNameStorageKey = 'title-list';
const localTaskStorageKey = 'task-list';

// HTML elements
const title = document.querySelector('#task-title');
const taskForm  = document.querySelector('#to-do-form');
const taskInput = document.querySelector('#to-do-input');
const filter = document.querySelector('#filter-select');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const taskListContainer = document.querySelector('#to-do-list');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const toolbar = document.querySelector('#toolbar');
const search = document.querySelector('#search');
const editTitleButton = document.querySelector('#edit-title-button');
const editTitleForm = document.querySelector('#edit-title-form');
const newTitleInput = document.querySelector('#new-title-input');
const newTitleButton = document.querySelector('#new-title-button');

// Variables
let taskId;
let taskName;
let selectedValue = 'to-do';
let searchValue = '';

// Title
const titleName = new Title();

// Show all tasks
const taskList = new TaskList(JSON.parse(localStorage.getItem(localTaskStorageKey) || "[]"));

// Search filter
const smartSearch = new SmartSearch();

// Events
taskForm.addEventListener("submit",(e) => {   
    e.preventDefault();

    const inputValue = taskInput.value;

    if(inputValue) {
        let task = new Task(inputValue, localTaskStorageKey); 
        taskList.showTasks(JSON.parse(localStorage.getItem(localTaskStorageKey) || "[]"),selectedValue);  
        taskInput.value = '';
        taskInput.focus();     
    }    
});

document.addEventListener('click',(e) => {
    const targetElement = e.target;
    const parentElement = targetElement.closest("div");

    if(targetElement.classList.contains("finish-to-do")) {
        taskId = parentElement.querySelector("h4").innerText;
        parentElement.classList.toggle("done");
        taskList.checkTask(localTaskStorageKey,taskId);
    }

    if(targetElement.classList.contains("remove-to-do")) {
        taskId = parentElement.querySelector("h4").innerText;
        parentElement.remove();
        taskList.removeTask(localTaskStorageKey,taskId);
    }

    if(targetElement.classList.contains("edit-to-do")) {
        taskId = parentElement.querySelector("h4").innerText;
        toggleForms();
        taskName = parentElement.querySelector("h3").innerText;
        editInput.value = taskName
    }
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentValue = editInput.value
    console.log(currentValue)
    console.log("taskname: "+taskName)

    if(currentValue) {
        taskList.updateTask(localTaskStorageKey,taskId,currentValue);
    }

    toggleForms();
    taskList.showTasks(JSON.parse(localStorage.getItem(localTaskStorageKey) || "[]"),selectedValue);
})

filter.addEventListener('change', (e) => {
    e.preventDefault();
    
    selectedValue = filter.options[filter.selectedIndex].value
    if(selectedValue === 'done'){
        selectedValue = 'to-do done';
    }

    taskList.showTasks(smartSearch.searchFilter(localTaskStorageKey,searchValue,selectedValue),selectedValue);
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
});

search.addEventListener('input', (e) => {
    searchValue = e.target.value;
    taskList.showTasks(smartSearch.searchFilter(localTaskStorageKey,searchValue,selectedValue),selectedValue);
});

editTitleButton.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms('title');
    titleName.getTitleName(userNameStorageKey);
});

newTitleButton.addEventListener('click', (e) => {
    e.preventDefault();
    const newTitle = newTitleInput.value;
    titleName.setTitleName(userNameStorageKey,newTitle);
    titleName.getTitleName(userNameStorageKey);
    newTitleInput.value = ''
    toggleForms('title');
});

const toggleForms = (text = 'edit') => {

    if(text == 'title'){
        editTitleForm.classList.toggle("hide")
        taskForm.classList.toggle("hide");
        taskListContainer.classList.toggle("hide");
        toolbar.classList.toggle("hide");
    }
    else if (text == 'edit'){
        editForm.classList.toggle("hide");
        taskForm.classList.toggle("hide");
        taskListContainer.classList.toggle("hide");
        toolbar.classList.toggle("hide");
    }    
};

titleName.getTitleName(userNameStorageKey);












