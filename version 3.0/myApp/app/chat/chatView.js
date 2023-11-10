import { ChatController } from './chatController.js';
import { ChatModel } from './chatModel.js';

class ChatApplication extends HTMLElement {
  constructor() {
      super(); 

      this.innerModdel = new ChatModel(); 
      this.innerController = new ChatController(this,this.innerModdel);
      
      this.containerElement = document.createElement('div');
      this.containerElement.className = "chat-container"; 

      this.titleUserA = document.createElement('H1');
      this.titleUserA.textContent = "Usuario A";
      this.textAreaUserA = document.createElement('textarea');
      this.textAreaUserA.className = "user-a-textarea"; 

      this.textAreaUserB = document.createElement('textarea');
      this.textAreaUserB.className = "user-b-textarea"; 

      this.inputTextUserA = document.createElement('input');
      this.inputTextUserA.className = "user-a-input"; 

      this.inputTextUserB = document.createElement('input');
      this.inputTextUserB.className = "user-b-input"; 

      this.sendUserA = document.createElement('button');
      this.sendUserA.innerHTML = "Enviar"; 
      this.sendUserA.className = "user-a-send-button"; 

      this.sendUserB = document.createElement('button');
      this.sendUserB.innerHTML = "Enviar"; 
      this.sendUserB.className = "user-b-send-button"; 

      document.body.appendChild(this.containerElement);
      this.containerElement.appendChild(this.titleUserA);
      this.containerElement.appendChild(this.textAreaUserA); 
      this.containerElement.appendChild(this.inputTextUserA);
      this.containerElement.appendChild(this.sendUserA);

      this.containerElement.appendChild(this.textAreaUserB); 
      this.containerElement.appendChild(this.inputTextUserB);
      this.containerElement.appendChild(this.sendUserB);
  }

  connectedCallback() {}

  disconnectedCallback() {}
}

customElements.define('x-chat-application', ChatApplication);

export { ChatApplication };
