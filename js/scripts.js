// Seleção de elementos
const toDoForm = document.querySelector('#to-do-form');
const toDoInput = document.querySelector('#to-do-input');
const toDoList = document.querySelector('#to-do-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;

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

    toDoInput.value = '';
    toDoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    toDoForm.classList.toggle("hide");
    toDoList.classList.toggle("hide");
}

const updateToDo = (text) => {

    const toDos = document.querySelectorAll(".to-do");

    toDos.forEach((toDoTask) => {

        let toDoTitle = toDoTask.querySelector('h3');

        if(toDoTitle.innerText === oldInputValue){
            toDoTitle.innerText = text
        }

    })

}


// Eventos
toDoForm.addEventListener("submit",(e) => {
    
    e.preventDefault();

    const inputValue = toDoInput.value;

    if(inputValue) {
        saveToDo(inputValue);
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
        parentElement.classList.toggle("done")
    }

    if(targetElement.classList.contains("remove-to-do")) {
        parentElement.remove();
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
