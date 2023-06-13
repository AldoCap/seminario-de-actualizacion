const { User } =  require("./User.js")
const { UserHandler } = require("./UserHandler.js") 
const { Group } = require("./Group.js") 
const { GroupHandler } = require("./GroupHandler.js") 
const { userData } = require("./userData.js") 
const { userLoginData } = require("./userLoginData.js") 
const { groupData } = require("./groupData.js") 
const { DataBaseHandler } = require("../Database/database.js")
const file =  require("../Database/Config.js")


//Create database connection----------------------------------------------------------
let db = new DataBaseHandler(file);

// let datauser = ['00998877','miguelito']
db.connect()
// db.callStoredProcedure('selectAllData','user')
// db.callStoredProcedure('addUser',datauser)

//UserLoginData----------------------------------------------------------
userLoginData.username = 'juanchi'
userLoginData.password = '4545454'

//UserData----------------------------------------------------------

userData.namee = 'juan';
userData.surname = 'dominguez';
userData.dni = '5435435';
userData.phone = '3213213';
userData.gender = 'Masculio';
userData.address = 'Beruti 8490';
userData.email = 'junachi@gmail.com';
userData.userMembership = 'estudiante';


// db.callStoredProcedure('addUserData',Object.values(userData))

//User----------------------------------------------------------
let userHandler = new UserHandler(db);
userHandler.create(userLoginData,userData);

// userData.id = '2';

// let newData = {name : 'valen',surname : 'perez polo',gender : 'femenino',userMembership : ['profesor','regente']}

// userHandler.update('1',newData)

// userHandler.create(userData);
// // userHandler.read('1')

// // userHandler.remove('1')
// userHandler.getGoupMembership('2')

//Group----------------------------------------------------------
let groupHandler = new GroupHandler();

groupData.id = '1';
groupData.name = 'profesores';

groupHandler.create(groupData);

// groupHandler.read('1')

// let newDataGroup = {name : 'teachers'}
// groupHandler.update('1',newDataGroup)

// groupHandler.remove('1');

groupData.id = '2';
groupData.name = 'estudiantes';

groupHandler.create(groupData);

//Agrego el usuario 1 al grupo 2
groupHandler.addUser('1','2')

// groupHandler.removeUser('1','2')
