const mysql = require("mysql");

class userController {
    constructor()
    {}

    createUser(userData){
        
        console.log('creando usuario');
        
        let dataBase = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',  
            password: 'root',
            database: 'mydb',
        });

        const queryParams = Object.values(userData)
        
        .map((value) => `'${value}'`)
        .join(", ");

        return new Promise((resolve, reject) => {

            dataBase.connect((error) => {
                if (error) {
                    console.error("Error to connect DB: ", error);
                    reject(error);
                } else {
                    console.log("Success connection to DB!");

                    let name = `mp_CreateUser`;      
                    const query = `CALL ${name}(${queryParams})`;
            
                    dataBase.query(query, (error, results) => {
                        dataBase.end();  

                        if (error) {
                            console.error("QUERY ERROR:", error);
                            reject(error);
                        } 
                        else {
                            const queryResult = results[0][0].result; 
                                      
                            resolve(queryResult);
                        }
                    });

                }
            });
        });
    }

    deleteUser(){

    }
    updateUser(){

    }
    getUserCompleteData(){

    }
    getUserContact(){

    }
    getUserGroup(){

    }

    async validateUser(userName, userPassword) {
        console.log('Validating user');
        //console.log(userName, userPassword);
    
        const dataBase = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'mydb',
        });
    
        return new Promise((resolve, reject) => {
            dataBase.connect((error) => {

                if (error) {

                    console.error("Error connecting to DB: ", error);
                    reject(error);

                } else {
                    
                    console.log("Successful DB connection");
                    const procedureName = 'mp_GetAllUsers';
                    const query = `CALL ${procedureName}()`;
                    
                    dataBase.query(query, (error, results) => {
                    
                    dataBase.end();
    
                        if (error) {
                            console.error("Query error:", error);
                            reject(error);

                        } else {

                            const users = results[0];
                            
                            let userFound = false;
                            for (let i = 0; i < users.length; i++) {
                                const user = users[i];
                                
                                if (user.nick_name === userName && user.password === userPassword) {
                                    userFound = true;
                                    break;
                                }
                            }
    
                            if (userFound) {
                                console.log("User validated");
                                resolve({ validated: true });
                            } else {
                                console.log("User not found or invalid credentials");
                                resolve({ validated: false });
                            }
                        }
                    });
                }
            });
        });
    }
}
    module.exports = { userController };
    