

class ChatModel extends EventTarget
{
    constructor()
    {
        super();
        this.sharedKey = undefined;
        this.activeChat = undefined;
        this.sessionData = undefined;
  
    }
    init()
    {
        console.log('init setInterval');

        setInterval(() =>
        {
            this.getMessage(this.activeChat);
        }, 5000);

        setInterval(()=>
        {
            this.getchatProposals();
        },5000)

    }
    async getMessage(chatID)
    {

        let fetchData = 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userid': sessionData.userID,
            },
            body: JSON.stringify(chatID), 
        };

        let request = await fetch( 'http://localhost:3000/getMessage',fetchData );

        let response = await request.json();

        for(let message of response)
        {
            const ivArray = new Uint8Array(Object.values(message.body['iv']));
            const dataArray = new Uint8Array(Object.values(message.body['data']));

            const ivBuffer = ivArray.buffer;
            const dataBuffer = dataArray.buffer;

            message.body = decryptMessage({ iv: ivBuffer, data: dataBuffer }, this.sharedKey)

            this.dispatchEvent(new CustomEvent('message',{detail: {message}}));
        }

        return response;
    }
    async sendMessage(message)
    {
        
        let fetchData = 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userid': sessionData.userID,
            },
            body: JSON.stringify({message: await encryptMessage(message,this.sharedKey),chatID: this.activeChat}), 
        };

        let request = await fetch( 'http://localhost:3000/sendMessage',fetchData );

        let response = await request.json();
        
        return response;
    }
   
    async getSharedKey()
    {
        let fetchData = 
        { 
            method: 'GET', 
            headers: 
            {
                'Content-Type': 'application/json',
            }
        }

        let request = await fetch( 'http://localhost:8080/getSharedKey',fetchData );

        let response = await request.json();

        this.sharedKey = response;

        return response;
    }
    
    saveInLocalStorage(key,data)
    {
        localStorage.setItem(key, JSON.stringify(data));
    }
    getDataInLocalStorage(key)
    {
        // Para recuperar el objeto del localStorage
        const sessionData = localStorage.getItem(key);

        // Convierte la cadena JSON de nuevo a un objeto JavaScript
        const data = JSON.parse(sessionData);

        return data;
    }
}

export {ChatModel};