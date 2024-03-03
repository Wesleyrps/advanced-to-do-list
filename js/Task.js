export class Task{
    
    // Atributes
    _id;
    _name;

    constructor (inputText, taskList) {
        let lastID = taskList.length === 0 ? 0 : taskList[taskList.length-1].id
        
        this._id    = lastID+1;
        this._name  = inputText;
    };

    getId(){ return this._id }
    
    getName(){ return this._name }
}