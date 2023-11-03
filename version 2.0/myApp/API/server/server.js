const http = require('http');
const { signInHandler } = require('../server/controllers/sessionHandler.js');
const { registerHandler } = require('../server/controllers/sessionHandler.js');

class Server {
    constructor() {
        const { url } = require('inspector');
        this.hostname = '127.0.0.1';
        this.port = 3000;

        const server = http.createServer(this.processRequest.bind(this));
        server.listen(this.port, this.hostname, () => {
            console.log(`Servidor escuchando en http://${this.hostname}:${this.port}`);
        });

        };
    processRequest( request, response )
    {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (request.method === 'OPTIONS') 
	{
		response.writeHead(204).end();
	}
	else if ( request.method == 'GET' )
	{
		switch( request.url)
		{
			case '/login':
				{
					const data = { message: '[GET] /login NodeJS with CORS!' };
					response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
					response.end(JSON.stringify(data));
				} break;
			
			case '/':
			{
				const data = { message: '[GET] / NodeJS with CORS!' };
				response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
				response.end(JSON.stringify(data));
			} break;

			default:
			{	
				response.writeHead(404).end();
			};

		}
		
	}
	else if ( request.method == 'POST' )
	{
		switch( request.url)
		{
			case '/':
			{
				const data = { message: '[POST] Hello World NodeJS with CORS!' };
				response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
				response.end(JSON.stringify(data));
			}
			break;
		
			case '/signIn':
			{
				signInHandler(request,response);
			}
			break;

			default:
			{
				response.writeHead(404).end();
			};
		}
	}
	else
	{
		response.writeHead(404).end();
	}
}
}
module.exports = { Server };