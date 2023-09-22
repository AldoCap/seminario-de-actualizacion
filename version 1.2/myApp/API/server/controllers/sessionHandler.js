const {userController} = require("./userController");


async function signInHandler(requestData, responseCallback){
    
    console.log('signin'); 
   try {       
        let userControl = new userController();
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
            console.log('aprobado');            
            responseData = {
                id:validateResponse.iduser,
                token: '',
                message: "User and Password Correct"
            }
            responseCallback(200, responseData);
        }       
    } catch (error) {
       responseCallback(400,error);
    }
}


async function registerHandler(requestData, responseCallback){
    console.log('register');  
    
   try {      
        let userData = {
            'password'  : requestData.password,
            'name'      : requestData.name,
            'surname'   : requestData.surname,
            'dni'       : requestData.dni,
            'email'     : requestData.email,
            'phone'     : requestData.phone            
        };        

        let userControl = new userController();
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
