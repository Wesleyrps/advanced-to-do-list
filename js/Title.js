export class Title {

    _title = document.querySelector('#task-title').innerText
    
    setTitleName(storage, newTitle){
        localStorage.setItem(storage,newTitle)
        // let values = JSON.parse(localStorage.getItem(storage) || "[]")
        // let lastID = values.length === 0 ? 0 : values[values.length-1].id
        
        // values.push({
        //     id: lastID+1,
        //     title: newTitle
        // })
    
        // localStorage.setItem(storage,JSON.stringify(values))
        
        this._title = newTitle
        
        
        
    }

    getTitleName(storage){ 
        let values = localStorage.getItem(storage)
        let titleHTML = document.getElementById('task-title')

        if (values){
            titleHTML.innerHTML = values
        }else{
            titleHTML.innerHTML = 'Task List'
        }
        
    }
}