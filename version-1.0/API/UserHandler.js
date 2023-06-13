const { listOfUsers } = require("../common/lists.js")
const { User } =  require("./User.js")

class UserHandler
{
    constructor(databaseHandler)
    {
        this.databaseHandler = databaseHandler;
        this.databaseHandler.connect();
    }
    create(userLoginData,userData)
    {
        let user = new User(userData);
        let state = false;
        
        if (typeof(user) == 'object') 
        {
            state = true;
            this.databaseHandler.callStoredProcedure('addUser',Object.values(userLoginData));
            this.databaseHandler.callStoredProcedure('addUserData',Object.values(userData));
            listOfUsers.push(user);
        }
        console.log(listOfUsers)
        return state;
        
    }
    remove(id)
    {
        // let index = listOfUsers.findIndex(user => user.id === id);
        // listOfUsers.splice(index, 1);
        this.databaseHandler.callStoredProcedure('deleteUser',id);

    }
    update(id,newData)
    {
        let index = listOfUsers.findIndex(user => user.id === id);
        for (const key in newData)//tambien se puede usar spread operator...
        { 
            listOfUsers[index][key] = newData[key];
        }
    }
    read(id)
    {
        // let index = listOfUsers.findIndex(user => user.id === id);
        //JOIN
        this.databaseHandler.callStoredProcedure('',id);
    }
    getGoupMembership(id)
    {
        let index = listOfUsers.findIndex(user => user.id === id);

        console.log(listOfUsers[index].userMembership)
    }
    associateUserWithUserdata(idUser,idUserData)
    {
        this.databaseHandler.callStoredProcedure('addUserHasUserdata',idUser,idUserData);
    }
}

module.exports = { UserHandler }