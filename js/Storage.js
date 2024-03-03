export class Storage{

    _storageKey;

    constructor(storageKey){
        this._storageKey = storageKey
    }

    setValues(values){
        localStorage.setItem(this._storageKey,JSON.stringify(values));
    }

    getValues(){
        return JSON.parse(localStorage.getItem(this._storageKey) || "[]");
    }
}