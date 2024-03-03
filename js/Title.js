export class Title {

    _title;

    constructor (title) {
        if(title == ''){
            this._title = 'Task List';
        }else{
            this._title = title;
        }
    }

    setTitleName(newTitle){
        if(newTitle == ''){
            this._title = 'Task List';
        }else{
            this._title = newTitle;
        }
    }
    
    getTitleName(){
        return this._title;
    }

    showTitle(){
        let titleHTML = document.getElementById('task-title')
        return titleHTML.innerText = this._title
    }

}