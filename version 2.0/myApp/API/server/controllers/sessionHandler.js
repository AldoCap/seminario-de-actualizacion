const {UserController} = require("./userController");
const {tokenHandler} = require('./tokenHandler.js');


async function signInHandler(req, res){

    let body = '';
            
    req.on('data', (chunk) => {
        body += chunk.toString();

    });

    req.on('end', () => {
       
         
           const requestData = JSON.parse(body);
            console.log(requestData);  

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({status:true,data:requestData}));
       
    });



 /*   
   try {       
        let userControl = new UserController();
        const dateUser = await userControl.validateUser(requestData.userName, requestData.password);
       
        const validateResponse = await JSON.parse(dateUser);
       
        if (!validateResponse){
            
            responseData = {
                id:0,
                message: "User or Password Incorrect"
            }          
            //responseCallback(400, responseData);
            responseCallback.writeHead(statusCode, { 'Content-Type': 'application/json' });
            responseCallback.end(JSON.stringify(responseData));
        }
        else {
                    
            responseData = {
                id:validateResponse.iduser,
                message: "User and Password Correct",
                token: tokenHandler.generateToken(validateResponse.iduser),
            }
            responseCallback(200, responseData);
        }   console-log(validateResponse.iduser); 
    } catch (error) {
       responseCallback(400,error);
    }
    */
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
