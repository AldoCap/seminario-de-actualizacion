
import { encryptMessage,decryptMessage } from "../utils/encrypting.js";
class ChatModel {
    constructor() 
    {
     this.getSharedKey(); 
    this.sharedKey = undefined;
    }

    async sendMessage(message) 
    {
        try {
            message.body = await encryptMessage(message.body,this.sharedKey);
            let requestMetadata = {
                method: "POST",
                body:JSON.stringify(message),
              };
            const   response = await fetch('http://127.0.0.1:3000/sendMessage', requestMetadata);
            //this.getMessage()
          if (!response.ok) {
            throw new Error('Error al enviar el mensaje al servidor');
          }

        } catch (error) {
          console.error('Error al enviar el mensaje al servidor:', error);
        
        }
      }
      async getMessage() 
      {
          try {
              
              let requestMetadata = {
                  method: "POST",
                };
              const   response = await fetch('http://127.0.0.1:3000/getMessage',requestMetadata);
              let request = await response.json();
             
            if (!response.ok) {
              throw new Error('Error al enviar el mensaje al servidor');

            }else{

              for(let message of request)
              {
                  const ivArray = new Uint8Array(Object.values(message.body['iv']));
                  const dataArray = new Uint8Array(Object.values(message.body['data']));
      
                  const ivBuffer = ivArray.buffer;
                  const dataBuffer = dataArray.buffer;
                  
                  message.body = await decryptMessage({ iv: ivBuffer, data: dataBuffer }, this.sharedKey)
                 
              }

              return request; 
            }
            
          } catch (error) {
            console.error('Error al enviar el mensaje al servidor:', error);
          
          }
        }
        
    async getSharedKey() 
    {
      try {
          
          let requestMetadata = {
              method: "POST",
            };
          const response = await fetch('http://127.0.0.1:3000/getSharedKey',requestMetadata);
          let request = await response.json();

          this.sharedKey = request;
          this.saveInLocalStorage(this.sharedKey); 
        
      } catch (error) {
        console.error('Error al enviar el mensaje al servidor:', error);
      
      }
    }
  
    saveInLocalStorage(key) 
    {
      localStorage.setItem("key", JSON.stringify(key));
      
    }
  
  }
  
  export { ChatModel };
  
  