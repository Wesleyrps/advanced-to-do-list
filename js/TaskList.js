export class TaskList{
    
    _list;

    constructor (list){
        this._list = list
        this.showTasks();
    }

    addTask(taskId, taskName) {
        this._list.push({
            id: taskId,
            name: taskName,
            class: "to-do",
            createDate: this.getCurrentDate()
        })
    }

    getTasks() { return this._list; }

    showTasks(filterText = 'to-do', searchValue = this._list) {
        let list = document.getElementById('to-do-list')

        list.innerHTML = ''
        for(let i = 0; i < searchValue.length; i++) {
            if(searchValue[i].class === 'to-do '+filterText) {
                this.tasksHTML(list, searchValue, i); 
            }
            else if(searchValue[i].class === filterText) {
                this.tasksHTML(list, searchValue, i); 
            }
            else if(filterText === 'all') {
                this.tasksHTML(list, searchValue, i); 
            }
        }

        return this._list;
    }

    tasksHTML(list, searchValue, i) {
        return list.innerHTML += 
                            `<div class="${searchValue[i]['class']}">
                                <div class="name-date-to-do">    
                                    <h4 class="hide">${searchValue[i]['id']}</h4>     
                                    <h3>${searchValue[i]['name']}</h3>
                                    <p>${searchValue[i]['createDate']}</p>
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

    checkTask (id) {
        let index = this._list.findIndex(x => x.id == id)

        

        if (this._list[index].class === 'to-do done'){
            this._list[index].class = 'to-do'
        } 
        else if (this._list[index].class === 'to-do'){
            this._list[index].class = 'to-do done'
        }
    }

    updateTask (id, newTaskName) {
        let index = this._list.findIndex(x => x.id == id); 

        this._list[index]['name'] = newTaskName;
    }

    removeTask (id) {
        let index = this._list.findIndex(x => x.id == id)
    
        this._list.splice(index,1)
    }

    getCurrentDate() {
        const d = new Date();
        let day = d.getDate();
        let month = d.getMonth()+1;
        let year = d.getFullYear();
        let currentData = month<10 ? day<10 ? '0'+day+'/0'+month+'/'+year : day+'/0'+month+'/'+year : day+'/'+month+'/'+year; 

        return currentData;
    }    
}
