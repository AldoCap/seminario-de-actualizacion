class Chat
{
    constructor()
    {
        this.messages = [];
    }

    sendMessage(message)
    {
         
        this.messages.push(message);
        console.log(this.messages);
    }
    getMessage()
    {   
        return this.messages
    }
}
module.exports = {Chat}; 