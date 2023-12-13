class ChatController {
    constructor(view, model) {
      this.innerView = view;
      this.innerModel = model;
  
      this.innerView.addEventListener('sendUserA', async(event) => {
        const message = event.detail.message;
        await this.sendMessage('UserA', message);
      });
  
      this.innerView.addEventListener('sendUserB', async(event) => {
        const message = event.detail.message;
        await this.sendMessage('UserB', message);
      });
  
    }
  
    sendMessage(user, message) {
      let key = localStorage.getItem("key"); 
      let chatData = 
      {
        "originID":user,
        "body": message,
        "key": key
				}
      this.innerModel.sendMessage(chatData);
    }

    getMessage() 
    {

      return this.innerModel.getMessage();
    }
  }
  
  export { ChatController };
  