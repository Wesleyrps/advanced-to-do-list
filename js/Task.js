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

        this.storeTask(storage, values)
    };

    storeTask (storage, storageSetValues) {
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