const http = require('http');
const { signInHandler } = require('../server/controllers/sessionHandler.js');
const { registerHandler } = require('../server/controllers/sessionHandler.js');
const { Chat } = require('../chat.js');

class Server {
    constructor() {
        const { url } = require('inspector');
        this.hostname = '127.0.0.1';
        this.port = 3000;
		this.chat = new Chat();
        const server = http.createServer(this.processRequest.bind(this));
        server.listen(this.port, this.hostname, () => {
            console.log(`Servidor escuchando en http://${this.hostname}:${this.port}`);
        });

        };
		createSharedKey() 
		{
			const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let llave = '';
			let longitud = 32;
			
			for (let i = 0; i < longitud; i++) 
			{
				const indice = Math.floor(Math.random() * caracteres.length);
				llave += caracteres.charAt(indice);
			}
			
			return llave;
		}
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
			case '/getMessage':
			{
				response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
				let messages = this.chat.getMessage();
				console.log(messages); 
				response.end(JSON.stringify( messages )); 
				
			}
			break;
			case '/getSharedKey':
			{
				let sharedKey = this.createSharedKey();
				response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
				response.end(JSON.stringify( sharedKey )); 
			}
			break;

			case '/sendMessage':
			{
				let body = [];
				request.on('data', (chunk) => 
				{
					body.push(chunk);
				}).on('end', () => 
				{
						body = Buffer.concat(body).toString();
						// Convierte la cadena en un objeto JSON
						let requestBody = body ? JSON.parse(body) : {};
	
						this.chat.sendMessage(requestBody);
	
						response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
						response.end(JSON.stringify( true ));
					
				});   
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