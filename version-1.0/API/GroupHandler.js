const { Group } = require("./Group.js") 
const { listOfGroups } = require("../common/lists.js")


class GroupHandler
{
    constructor()
    {
    }
    create(data)
    {
        let group = new Group(data);
        let state = false;

        if (typeof(group) == 'object') 
        {
            state = true;
            listOfGroups.push(group);
        }
        // console.log(group)
        return state;
    }
    remove(id)
    {
        let index = listOfGroups.findIndex(group => group.id === id);
        listOfGroups.splice(index, 1);
    }
    update(id,newData)
    {
        let index = listOfGroups.findIndex(group => group.id === id);

        for (const key in newData)//tambien se puede usar spread operator...
        { 
            listOfGroups[index][key] = newData[key];
        }
        console.log(listOfGroups[index])
    }
    read(id)
    {
        let index = listOfGroups.findIndex(group => group.id === id);
    
        console.log(listOfGroups[index])
    }
    addUser(userID,groupID)
    {
        let indexOfGroup = listOfGroups.findIndex(group => group.id === groupID);
        listOfGroups[indexOfGroup].usersInGroup.push(userID)

        console.log('Usuarios en el grupo: ',listOfGroups[indexOfGroup].usersInGroup)

    }
    removeUser(userID,groupID)
    {
        let indexOfGroup = listOfGroups.findIndex(group => group.id === groupID);
        let indexOfUser = listOfGroups[indexOfGroup].usersInGroup.findIndex(id => id === userID);
        listOfGroups[indexOfGroup].usersInGroup.splice(indexOfUser,1)

        console.log(listOfGroups[indexOfGroup].usersInGroup)
    }
}

module.exports =  { GroupHandler }
