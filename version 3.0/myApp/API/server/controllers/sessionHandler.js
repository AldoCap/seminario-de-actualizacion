const { UserController } = require("./userController.js");
const { tokenHandler } = require("./tokenHandler.js");

async function signInHandler(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const requestData = JSON.parse(body);

      let userControl = new UserController();
      const dateUser = await userControl.validateUser(
        requestData.userName,
        requestData.password
      );

      const data = {
        userId: dateUser,
        token: tokenHandler.generateToken(dateUser),
      };

      if (dateUser) {
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(
          JSON.stringify({
            status: true,
            message: "User and Password Correct",
            data: data,
          })
        );
      } else {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ status: false, message: "Internal Server Error" })
        );
      }
    } catch (error) {
      console.error(error);

      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: false, message: "Internal Server Error" })
      );
    }
  });
}

async function registerHandler(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const requestData = JSON.parse(body);

      let userData = {
        password: requestData.password,
        name: requestData.name,
        surname: requestData.surname,
        dni: requestData.dni,
        email: requestData.email,
        phone: requestData.phone,
      };

      let userControl = new UserController();
      const newUser = await userControl.createUser(userData);
      const newUserResponse = await JSON.parse(newUser);

      if (newUserResponse.status === 1) {
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });

        responseData = {
          id: newUserResponse.id,
          token: "",
          message: newUserResponse.message,
        };

        res.end(JSON.stringify(responseData));
      } else {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ status: false, message: "Internal Server Error" })
        );
      }
    } catch (error) {
      console.error(error);

      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: false, message: "Internal Server Error" })
      );
    }
  });
}

module.exports = { registerHandler, signInHandler };
