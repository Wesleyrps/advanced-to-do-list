export class SmartSearch {
    
    searchFilter(storage, event) {
        //console.log(e.target.value.toLowerCase());
        let list = JSON.parse(localStorage.getItem(storage) || "[]")
        let taskList = [];
        
        for(var i in list)
            taskList.push(list[i].name);
    
        let temp = ''
        const result = taskList.filter(item=> item.toLowerCase().includes(event.target.value.toLowerCase()));
        console.log(result)
    }
}