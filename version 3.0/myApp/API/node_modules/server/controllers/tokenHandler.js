const { v4: uuidv4 } = require('uuid');

class TokenHandler {
    constructor() {
        this.storage = new Map();
    }

    generateToken(idUser) {
        const token = uuidv4();
        this.storage.set(idUser, token);

        return token;
    }

    removeToken(idUser) {
        this.storage.delete(idUser);
    }
}

let tokenHandler = new TokenHandler();
module.exports = { tokenHandler };