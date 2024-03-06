export class Background{
    _bgPath;

    constructor (bgPath) {
        if(bgPath == ''){
            this._bgPath = `url('/img/bg1.jpg')`;
        }else{
            this._bgPath = bgPath;
        }
    }

    setBG(bgPath){
        this._bgPath = bgPath
    }

    getBG(){
        return this._bgPath;
    }

    showBG(){
        return document.body.style.backgroundImage = this._bgPath;
    }
}