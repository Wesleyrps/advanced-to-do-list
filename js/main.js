import { Task } from "./Task.js";
import { TaskList } from "./TaskList.js";
import { SmartSearch } from "./SmartSearch.js"
import { Title } from "./Title.js";
import { Storage } from "./Storage.js";

// Storage Keys
const titleStorageKey = 'title-storage'; // Depois das substituições trocar para titleStorageKey
const tasksStorageKey = 'task-list'; // Depois das substituições trocar para tasksStorageKey

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
const searchInput = document.querySelector('#search-input');
const editTitleButton = document.querySelector('#edit-title-button');
const editTitleForm = document.querySelector('#edit-title-form');
const newTitleInput = document.querySelector('#new-title-input');
const newTitleButton = document.querySelector('#new-title-button');
const eraseButton = document.querySelector('#erase-button');

// Variables
let taskId;
let taskName;
let selectedValue = 'to-do';
let searchValue = '';

// Objects
const tasksStorage = new Storage(tasksStorageKey);
const titleStorage = new Storage(titleStorageKey);
const titleName = new Title(titleStorage.getValues());
const taskList = new TaskList(tasksStorage.getValues());
const smartSearch = new SmartSearch();

// Initial show
titleName.showTitle();

// Events
editTitleButton.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms('title');
});

newTitleButton.addEventListener('click', (e) => {
    e.preventDefault();
    const newTitle = newTitleInput.value;

    titleName.setTitleName(newTitle);
    titleStorage.setValues(titleName.getTitleName());
    titleName.showTitle();

    newTitleInput.value = ''
    toggleForms('title');
});

taskForm.addEventListener("submit",(e) => {   
    e.preventDefault();

    const inputValue = taskInput.value;

    if(inputValue) {
        let task = new Task(inputValue, taskList.getTasks());

        taskList.addTask(task.getId(),task.getName());        
        tasksStorage.setValues(taskList.getTasks());
        taskList.showTasks(selectedValue);
        
        searchInput.value = '';
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
        
        taskList.checkTask(taskId);
        tasksStorage.setValues(taskList.getTasks());     
        // taskList.showTasks(selectedValue);
    }

    if(targetElement.classList.contains("remove-to-do")) {
        taskId = parentElement.querySelector("h4").innerText;
        parentElement.remove();
        taskList.removeTask(taskId)
        tasksStorage.setValues(taskList.getTasks());
        taskList.showTasks(selectedValue);
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
    let currentValue = editInput.value

    if(currentValue) {
        taskList.updateTask(taskId,currentValue);
        tasksStorage.setValues(taskList.getTasks());
        taskList.showTasks(selectedValue);
    }

    toggleForms();
})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
});

search.addEventListener('input', (e) => {
    searchValue = e.target.value;
    taskList.showTasks(selectedValue, smartSearch.searchFilter(searchValue,tasksStorage.getValues()));
});

eraseButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    searchInput.value = '';
    taskList.showTasks(selectedValue);
});

filter.addEventListener('change', (e) => {
    e.preventDefault();
    
    selectedValue = filter.options[filter.selectedIndex].value
    if(selectedValue === 'done'){
        selectedValue = 'to-do done';
    }

    taskList.showTasks(selectedValue, smartSearch.searchFilter(searchValue,tasksStorage.getValues()));   
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
