const {UserController} = require("./userController");
const { v4: uuidv4 } = require('uuid');


async function signInHandler(requestData, responseCallback){
    
   try {       
        let userControl = new UserController();
        const dateUser = await userControl.validateUser(requestData.userName, requestData.password);
        const validateResponse = await JSON.parse(dateUser);
       
        if (!validateResponse){
            
            responseData = {
                id:0,
                message: "User or Password Incorrect"
            }          
            responseCallback(400, responseData);
        }
        else {
                    
            responseData = {
                id:validateResponse.iduser,
                token: generateUUID(),
                message: "User and Password Correct"
                
            }
            responseCallback(200, responseData);
        }       
    } catch (error) {
       responseCallback(400,error);
    }

    function generateUUID() {
        
        return uuidv4();
    }
}


async function registerHandler(requestData, responseCallback){
    
   try {      
        let userData = {
            'password'  : requestData.password,
            'name'      : requestData.name,
            'surname'   : requestData.surname,
            'dni'       : requestData.dni,
            'email'     : requestData.email,
            'phone'     : requestData.phone            
        };        

        let userControl = new UserController();
        console.log (userData.name);
        const newUser = await userControl.createUser(userData);
        const newUserResponse = await JSON.parse(newUser);

        if (newUserResponse.status === 1 ){
            console.log('Creado Correctamente');            
            responseData = {
                id:newUserResponse.id,
                token: '',
                message: newUserResponse.message
            }
            responseCallback(200, responseData);            
        }
        else {
            console.error("Error");  
            responseData = {
                id:0,
                message: newUserResponse.message
            }          
            responseCallback(400, responseData);            
        }   
         
        console.log(newUserResponse);

    } catch (error) {
        console.log("Error");
        responseCallback(400, error);
    }            
}

module.exports = {registerHandler, signInHandler};
