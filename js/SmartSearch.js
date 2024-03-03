export class SmartSearch {

    searchFilter(searchValue, tasksStorage) {
        let list = tasksStorage
        let taskList = [];
        let result = list
        
        for(var i in list){            
            taskList.push(
            list[i]);
        }
    
        if (searchValue == ''){
            console.log('')
        } else
        {
            result = taskList.filter(item=> item.name.toLowerCase().includes(searchValue.toLowerCase()));
        }
        return result
    }
}