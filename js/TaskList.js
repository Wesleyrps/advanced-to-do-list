export class TaskList{
    
    constructor (storage, filterText){
        this.showTasks(storage, filterText);
    }

    showTasks(values, filterText = 'to-do') {
        let list = document.getElementById('to-do-list')

        list.innerHTML = ''
        for(let i = 0; i < values.length; i++) {
            if(values[i].class === 'to-do '+filterText) {
                
                list.innerHTML += 
                            `<div class="${values[i]['class']}">
                                <div class="name-date-to-do">    
                                    <h4 class="hide">${values[i]['id']}</h4>     
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
            else if(values[i].class === filterText) {
                
                list.innerHTML += 
                            `<div class="${values[i]['class']}">
                                <div class="name-date-to-do">  
                                    <h4 class="hide">${values[i]['id']}</h4> 
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
            else if(filterText === 'all') {
                console.log(values[i]['create-date']);
                list.innerHTML += 
                            `<div class="${values[i]['class']}">
                                <div class="name-date-to-do">   
                                    <h4 class="hide">${values[i]['id']}</h4>  
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

    checkTask (storage, id) {
        let values = JSON.parse(localStorage.getItem(storage) || "[]")
        let index = values.findIndex(x => x.id == id)

        if (values[index].class === 'to-do done'){
            values[index].class = 'to-do'
        } 
        else if (values[index].class === 'to-do'){
            values[index].class = 'to-do done'
        }

        localStorage.setItem(storage,JSON.stringify(values))
    }

    updateTask (storage, id, newTaskName) {
        let values = JSON.parse(localStorage.getItem(storage) || "[]")
        let index = values.findIndex(x => x.id == id) 
        let oldTaskName = document.querySelector('h3');

        values[index]['name'] = newTaskName
        
        localStorage.setItem(storage,JSON.stringify(values))
    }

    removeTask (storage, id) {
        let values = JSON.parse(localStorage.getItem(storage) || "[]")
        let index = values.findIndex(x => x.id == id)
    
        values.splice(index,1)
        localStorage.setItem(storage,JSON.stringify(values))
    }

    // teste (values, filterText = 'to-do'){
    //     let list = document.getElementById('to-do-list')

    //     list.innerHTML = ''
    //     for(let i = 0; i < values.length; i++) {
    //         if(values[i].class === 'to-do '+filterText) {
                
    //             list.innerHTML += 
    //                         `<div class="${values[i]['class']}">
    //                             <div class="name-date-to-do">    
    //                                 <h4 class="hide">${values[i]['id']}</h4>     
    //                                 <h3>${values[i]['name']}</h3>
    //                                 <p>${values[i]['createDate']}</p>
    //                             </div>
    //                             <button class="finish-to-do">
    //                                 <i class="fa-solid fa-check"></i>
    //                             </button>
    //                             <button class="edit-to-do">
    //                                 <i class="fa-solid fa-pen"></i>
    //                             </button>
    //                             <button class="remove-to-do">
    //                                 <i class="fa-solid fa-xmark"></i>
    //                             </button>
    //                         </div>`
    //         }
    //         else if(values[i].class === filterText) {
                
    //             list.innerHTML += 
    //                         `<div class="${values[i]['class']}">
    //                             <div class="name-date-to-do">  
    //                                 <h4 class="hide">${values[i]['id']}</h4> 
    //                                 <h3>${values[i]['name']}</h3>
    //                                 <p>${values[i]['createDate']}</p>
    //                             </div>
    //                             <button class="finish-to-do">
    //                                 <i class="fa-solid fa-check"></i>
    //                             </button>
    //                             <button class="edit-to-do">
    //                                 <i class="fa-solid fa-pen"></i>
    //                             </button>
    //                             <button class="remove-to-do">
    //                                 <i class="fa-solid fa-xmark"></i>
    //                             </button>
    //                         </div>
    //                         `
    //         }
    //         else if(filterText === 'all') {
    //             console.log(values[i]['create-date']);
    //             list.innerHTML += 
    //                         `<div class="${values[i]['class']}">
    //                             <div class="name-date-to-do">   
    //                                 <h4 class="hide">${values[i]['id']}</h4>  
    //                                 <h3>${values[i]['name']}</h3>
    //                                 <p>${values[i]['createDate']}</p>
    //                             </div>
    //                             <button class="finish-to-do">
    //                                 <i class="fa-solid fa-check"></i>
    //                             </button>
    //                             <button class="edit-to-do">
    //                                 <i class="fa-solid fa-pen"></i>
    //                             </button>
    //                             <button class="remove-to-do">
    //                                 <i class="fa-solid fa-xmark"></i>
    //                             </button>
    //                         </div>`
    //         }
    //     }
    // }
}