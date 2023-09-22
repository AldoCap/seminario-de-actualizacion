const { server } = require('./server/server.js');
const { signInHandler } = require('./server/controllers/sessionHandler.js');
const { registerHandler } = require('./server/controllers/sessionHandler.js');


function startApplication() {  
  const nodeServer = new server();

 
  nodeServer.post('/signIn',   signInHandler);
  nodeServer.post('/register', registerHandler);

  nodeServer.start(3000);
}

startApplication();

