const http = require('http');

class Server {
    constructor(port) {
        this.hostname = '127.0.0.1';
        this.routes = {
            GET: [],
            POST: []
        };
     
       

        this.headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json',
        }
        
    }

    get(url, handler) {
        
        this.routes.GET[url] = handler;
    }

    post(url, handler) {
        
        this.routes.POST[url] = handler;
    }

   
  async  handleRequest(req, res) 
    {
        const method = req.method;
        const url = req.url;
        
      if (method === "OPTIONS"){
        res.writeHead(204,this.headers)
        res.end();
        return;
      }
        
        const handler = this.routes[method][url]|| this.routes[method]["*"];

        if (handler) {
            res.writeHead(200, this.headers);
            handler(req, res);
          } else {
           
            res.writeHead(404, this.headers); 
            res.end('Error 404. Route not found');
          }

           /* if (url === '/signIn') {
                let body = '';
            
                req.on('data', (chunk) => {
                    body += chunk.toString();

                });
            
                req.on('end', () => {
                    try {
                       // const requestData = body ? JSON.parse(body) : {};

                       const requestData = JSON.parse(body);
                        console.log(requestData);

                        handler(requestData, (statusCode, responseData) => {
                            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(responseData));
                        });
                        
                    } catch (error) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end('Bad Request');
                    }
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Error 404. Route not found');
            }
            */
            
    }

    start(port){
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(port, () => {
            console.log(`Server running at http://${this.hostname}:${port}/`);
        });
    }
}

module.exports = { Server };
