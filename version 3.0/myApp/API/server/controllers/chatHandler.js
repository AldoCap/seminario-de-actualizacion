//const getCurrentDate = require("./Utils/Date.js");

class ChatHandler
{
    constructor()
    {
        this.onlineUserList = [];
        this.chatProposals = [];
        this.chatsMessages = new Map();

    }
    connectUser(user)
    {
        // Verifica si el array contiene un objeto con el ID específico
        const isActive = this.onlineUserList.some(userID => userID === user);

        if (isActive) 
        {
            console.log(`Usuario con ID ${user} ya existe en el array.`);
        }
        else 
        {
            console.log(`Usuario con ID ${user} no existe en el array.`);
            this.onlineUserList.push(user);
        }
    }
 
    sendMessage(origin,chatReference)
    {
        let obj = {response: false};
        if((origin !== undefined) && chatReference.message != '')
        {
            let searchedObj = this.chatProposals.find(chat => chat.id == chatReference.chatID);
            let targetID = '';
            searchedObj.userTarget == origin? targetID = searchedObj.origin : targetID = searchedObj.userTarget;

            let chatMessage = 
            {
                id: this.chatsMessages.size+1,
                originID: origin,
                targetID: targetID,
                body: chatReference.message,
                state: 'sended',
                //timeStandSend: getCurrentDate(),
                timeStandReceived: undefined
            }
            if(this.chatsMessages.size == 0)
            {
                this.chatsMessages.set(chatReference.chatID,new Map());
            }
            const chatMessagesMap = this.chatsMessages.get(chatReference.chatID);

            if (chatMessagesMap) {
            let messagesArray = chatMessagesMap.get(targetID) || [];
            messagesArray.push(chatMessage)
            chatMessagesMap.set(targetID, messagesArray);
            obj['response'] = true;
            obj['messages'] = [messagesArray[messagesArray.length-1]];
            console.log('api chat2: ' + obj['messages'][0].timeStandSend);

        } else {
                console.log('no existe id')
            }
        }
        return obj;
    }
    getMessage(origin,chatID)
    {
        let messages = [];
        if(origin !== undefined)
        {
            if (this.chatsMessages.size === 0) 
            {
                console.log('El mapa está vacío.');
            } 
            else 
            {
                const chatMessagesMap = this.chatsMessages.get(chatID);
                
                if (chatMessagesMap) 
                {
                    let messagesArray = chatMessagesMap.get(origin) || [];

                    for (const message of messagesArray) 
                    {
                        //message.timeStandReceived = getCurrentDate();
                    }
                    messages = messagesArray.filter((objMessage) => (objMessage.targetID == origin && objMessage.state == 'sended'));
                    for (const message of messagesArray) 
                    {
                        message.state = 'received';
                    }
                } else {
                    console.log(`No se encontró un chat con el ID especificado. ${chatID}`);
                }
            }
        }

        return messages;
    }
}

module.exports = {ChatHandler};