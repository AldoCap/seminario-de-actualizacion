class ChatController
{
    constructor(view,model)
    {
        this.innerView = view;
        this.innerModel = model;
        
        model.init();
        model.addEventListener('message',(event)=> { this.onGetMessage(event) });
    }

async onGetMessage(event)
{
    let message = await event.detail.message;

    this.innerView.addReplyMessageOnChat(message);
}

async onSendMessage(message)
{
    let response = await this.innerModel.sendMessage(message);

    return response;
}
    proposeChat(userTarget)
    {
        this.innerModel.proposeChat(userTarget);
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

export {ChatController};