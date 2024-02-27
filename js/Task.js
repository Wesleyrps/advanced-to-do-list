export class Task{
    
    // Atributes
    _id;
    _name;
    _class;
    _createDate;     

    constructor (inputText, storage) {
        let values      = JSON.parse(localStorage.getItem(storage) || "[]")
        let lastID      = values.length === 0 ? 0 : values[values.length-1].id

        this._id            = lastID+1;
        this._name          = inputText;
        this._class         = "to-do";
        this._createDate    = this.getCurrentDate();

        values.push({
            id: this._id,
            name: this._name,
            class: this._class,
            createDate: this._createDate,
        })

        this.storeTask(inputText, storage, values)
    };

    storeTask (inputText, storage, storageSetValues) {
        
        const taskList = document.querySelector('#to-do-list');

        const task = document.createElement("div");
        task.classList.add("to-do");

        const taskTitle = document.createElement("h3");
        taskTitle.innerText = inputText;
        task.appendChild(taskTitle);

        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-to-do");
        doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        task.appendChild(doneBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-to-do");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        task.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("remove-to-do");
        deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        task.appendChild(deleteBtn);
        
        taskList.appendChild(task);

        localStorage.setItem(storage,JSON.stringify(storageSetValues))
    }

    getCurrentDate() {
        const d = new Date();
        let day = d.getDate();
        let month = d.getMonth()+1;
        let year = d.getFullYear();
        let currentData = month<10 ? day+'/0'+month+'/'+year : day+'/'+month+'/'+year;
        return currentData;
    }    

}