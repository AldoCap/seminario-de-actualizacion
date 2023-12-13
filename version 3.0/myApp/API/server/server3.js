const http = require("http");

class Server {
  constructor(port) {
    this.hostname = "127.0.0.1";
    const _port = port; 
    this.routes = {
      GET: [],
      POST: [],
 
    };

    this.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "content-type",
      "Content-Type": "application/json",
    };
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    server.listen(port, () => {
      console.log(`Server running at http://${this.hostname}:${_port}/`);
    });
  }

  get(url, handler) {
    this.routes.GET[url] = handler;
  }

  post(url, handler) {
    this.routes.POST[url] = handler;
  }

  async handleRequest(req, res) {
    const method = req.method;
    const url = req.url;

    if (method === "OPTIONS") {
      res.writeHead(204, this.headers);
      res.end();
      return;
    }

    const handler = this.routes[method][url] || this.routes[method]["*"];

    if (handler) {
      res.writeHead(200, this.headers);
      handler(req, res);
    } else {
      res.writeHead(404, this.headers);
      res.end("Error 404. Route not found");
    }
  }
}

module.exports = { Server };
