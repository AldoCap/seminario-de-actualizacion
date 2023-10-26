const mysql = require("mysql");

class UserController {
    constructor() {
        this.dbConfig = {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'mydb',
        };
    }

    async createUser(userData) {
        try {
            const connection = mysql.createConnection(this.dbConfig);
            await this.connectToDatabase(connection);

            const queryParams = Object.values(userData).map(value => `'${value}'`).join(", ");
            const procedureName = 'mp_CreateUser';
            const query = `CALL ${procedureName}(${queryParams})`;

            const results = await this.executeQuery(connection, query);
            connection.end();

            const queryResult = results[0][0].result;
            return queryResult;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async validateUser(userName, userPassword) {
        try {
            const connection = mysql.createConnection(this.dbConfig);
            await this.connectToDatabase(connection);

            const procedureName = 'mp_GetAllUsers';
            const query = `CALL ${procedureName}()`;

            const results = await this.executeQuery(connection, query);
            connection.end();

            const users = results[0];
            const userFound = users.some(user => user.nick_name === userName && user.password === userPassword);

            if (userFound) {
                console.log("User validated");
                return { validated: true };
            } else {
                console.log("User not found or invalid credentials");
                return { validated: false };
            }
        } catch (error) {
            console.error("Error validating user:", error);
            throw error;
        }
    }

    async connectToDatabase(connection) {
        return new Promise((resolve, reject) => {
            connection.connect((error) => {
                if (error) {
                    console.error("Error connecting to DB: ", error);
                    reject(error);
                } else {
                    console.log("Successful DB connection");
                    resolve();
                }
            });
        });
    }

    async executeQuery(connection, query) {
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    console.error("Query error:", error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = { UserController };
