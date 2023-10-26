const http = require('http');

class Server {
    constructor() {
        this.routes = {
            GET: [],
            POST: []
        };
        this.hostname = 'localhost';
    }

    get(url, handler) {
        this.routes.GET[url] = handler;
    }

    post(url, handler) {
        this.routes.POST[url] = handler;
    }

    start(port) {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(port, this.hostname, () => {
            console.log(`Server running at http://${this.hostname}:${port}/`);
        });
    }

    handleRequest(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            res.writeHead(204).end();
            return;
        }

        const method = req.method;
        const url = req.url;
        const handler = this.routes[method][url];

        if (handler) {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    const requestData = body ? JSON.parse(body) : {};
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
    }
}

module.exports = { Server };
