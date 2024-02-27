// Seleção de elementos
const toDoForm = document.querySelector('#to-do-form');
const toDoInput = document.querySelector('#to-do-input');
const toDoList = document.querySelector('#to-do-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const toolbar = document.querySelector('#toolbar');
const filter = document.querySelector('#filter-select');
const search = document.querySelector('#search');

const localStorageKey = 'wslim-to-do-list'

let oldInputValue;

// -------------------------------------------------------------------------------------------------------------------------
// Funções
const saveToDo = (text) => {

    const toDo = document.createElement("div");
    toDo.classList.add("to-do");

    const toDoTitle = document.createElement("h3");
    toDoTitle.innerText = text;
    toDo.appendChild(toDoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-to-do");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    toDo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-to-do");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    toDo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-to-do");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    toDo.appendChild(deleteBtn);
    
    toDoList.appendChild(toDo);

    // Armazenamento em local storage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let lastID = values.length === 0 ? 0 : values[values.length-1].id

    values.push({
        id: lastID+1,
        name: toDoTitle.innerText,
        class: toDo.className,
        createDate: getCurrentDate(),
    })
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    // ------------------------------
    
    toDoInput.value = '';
    toDoInput.focus();
};
// let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
// console.log(values[values.length-1].id)
const toggleForms = () => {
    editForm.classList.toggle("hide");
    toDoForm.classList.toggle("hide");
    toDoList.classList.toggle("hide");
    toolbar.classList.toggle("hide");
};

const updateToDo = (text) => {
    const toDos = document.querySelectorAll(".to-do");
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

    toDos.forEach((toDoTask) => {
        let toDoTitle = toDoTask.querySelector('h3'); 
        let index = values.findIndex(x => x.name == toDoTitle.innerText) 

        if(toDoTitle.innerText === oldInputValue){
            toDoTitle.innerText = text
            values[index].name = text
        }
    })   
    
    localStorage.setItem(localStorageKey,JSON.stringify(values))
};

const checkToDo = (text) => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == text)

    if (values[index].class === 'to-do done'){
        values[index].class = 'to-do'
    } 
    else if (values[index].class === 'to-do'){
        values[index].class = 'to-do done'
    }

    localStorage.setItem(localStorageKey,JSON.stringify(values))

}

const removeToDo = (text) => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == text)

    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
};


const showValues = (text = 'to-do') => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++) {
        if(values[i].class === 'to-do '+text) {
            
            list.innerHTML += 
                        `<div class="${values[i]['class']}">
                            <div class="name-date-to-do">    
                                <h3>${values[i]['name']}</h3>
                                <p>${values[i]['createDate']}</p>
                            </div>
                            <button class="finish-to-do">
                                <i class="fa-solid fa-check"></i>
                            </button>
                            <button class="edit-to-do">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="remove-to-do">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>`
        }
        else if(values[i].class === text) {
            
            list.innerHTML += 
                        `<div class="${values[i]['class']}">
                            <div class="name-date-to-do">    
                                <h3>${values[i]['name']}</h3>
                                <p>${values[i]['createDate']}</p>
                            </div>
                            <button class="finish-to-do">
                                <i class="fa-solid fa-check"></i>
                            </button>
                            <button class="edit-to-do">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="remove-to-do">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        `
        }
        else if(text === 'all') {
            console.log(values[i]['create-date']);
            list.innerHTML += 
                        `<div class="${values[i]['class']}">
                            <div class="name-date-to-do">    
                                <h3>${values[i]['name']}</h3>
                                <p>${values[i]['createDate']}</p>
                            </div>
                            <button class="finish-to-do">
                                <i class="fa-solid fa-check"></i>
                            </button>
                            <button class="edit-to-do">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="remove-to-do">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>`
        }
    }
}

const searchFilter = (e) => {
    //console.log(e.target.value.toLowerCase());
    let list = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let taskList = [];
    
    for(var i in list)
        taskList.push(list[i].name);

    let temp = ''
    const result = taskList.filter(item=> item.toLowerCase().includes(e.target.value.toLowerCase()));
    console.log(result)
}

function getCurrentDate(){
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    let currentData = month<10 ? day+'/0'+month+'/'+year : day+'/'+month+'/'+year;
    return currentData;

}

// -------------------------------------------------------------------------------------------------------------------------
// Eventos
toDoForm.addEventListener("submit",(e) => {
    
    e.preventDefault();

    const inputValue = toDoInput.value;

    if(inputValue) {
        saveToDo(inputValue);
        showValues();
    }    
});

document.addEventListener('click',(e) => {

    const targetElement = e.target;
    const parentElement = targetElement.closest("div");
    let toDoTitle;

    if(parentElement && parentElement.querySelector('h3')){
        toDoTitle = parentElement.querySelector("h3").innerText;
    }

    if(targetElement.classList.contains("finish-to-do")) {
        parentElement.classList.toggle("done");
        checkToDo(toDoTitle);
    }

    if(targetElement.classList.contains("remove-to-do")) {
        parentElement.remove();
        removeToDo(toDoTitle);
    }

    if(targetElement.classList.contains("edit-to-do")) {
        toggleForms();
        
        editInput.value = toDoTitle
        oldInputValue = toDoTitle
    }

});

cancelEditBtn.addEventListener('click', (e) => {
    
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateToDo(editInputValue);
    }

    toggleForms();
})


filter.addEventListener('change', (e) => {
    e.preventDefault();
    
    selectedValue = filter.options[filter.selectedIndex].value
    showValues(selectedValue);
})

search.addEventListener('input', searchFilter)

showValues();