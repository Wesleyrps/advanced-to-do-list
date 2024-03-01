export class SmartSearch {
    
    searchFilter(storage, event, filterText) {
        let list = JSON.parse(localStorage.getItem(storage) || "[]")
        let taskList = [];
        let result = list
        
        for(var i in list){
            
        
            if(list[i]['class'] === filterText){
                taskList.push(
                    list[i]
                    );
                    console.log("if1 -> list:"+list[i]['class']+" x "+"filterText:"+filterText)
            }
            else if (filterText === 'all'){
                taskList.push(
                    list[i]
                    );
                    console.log("if2 -> list:"+list[i]['class']+" x "+"filterText:"+filterText)
            }

        }
    
        if (event == ''){
            console.log('')
        } else
        {
            result = taskList.filter(item=> item.name.toLowerCase().includes(event.toLowerCase()));
            
        }
        
        return result
    }
}