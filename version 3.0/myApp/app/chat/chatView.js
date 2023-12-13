import { ChatController } from './chatController.js';
import { ChatModel } from './chatModel.js';

class ChatApplication extends HTMLElement {
  constructor() {
    super();

    this.innerModel = new ChatModel();
    this.innerController = new ChatController(this, this.innerModel);

    this.containerElement = document.createElement('div');
    this.containerElement.className = 'chat-container';

    this.titleUserA = document.createElement('h1');
    this.titleUserA.textContent = 'Usuario A';

    this.titleUserB = document.createElement('h1');
    this.titleUserB.textContent = 'Usuario B';

    this.textAreaUserA = document.createElement('textarea');
    this.textAreaUserA.className = 'user-a-textarea';

    this.textAreaUserB = document.createElement('textarea');
    this.textAreaUserB.className = 'user-b-textarea';

    this.inputTextUserA = document.createElement('input');
    this.inputTextUserA.className = 'user-a-input';

    this.inputTextUserB = document.createElement('input');
    this.inputTextUserB.className = 'user-b-input';

    this.sendUserA = document.createElement('button');
    this.sendUserA.innerHTML = 'Enviar';
    this.sendUserA.className = 'user-a-send-button';

    this.sendUserB = document.createElement('button');
    this.sendUserB.innerHTML = 'Enviar';
    this.sendUserB.className = 'user-b-send-button';

    document.body.appendChild(this.containerElement);
    this.containerElement.appendChild(this.titleUserA);
    this.containerElement.appendChild(this.textAreaUserA);
    this.containerElement.appendChild(this.inputTextUserA);
    this.containerElement.appendChild(this.sendUserA);

    this.containerElement.appendChild(this.titleUserB);
    this.containerElement.appendChild(this.textAreaUserB);
    this.containerElement.appendChild(this.inputTextUserB);
    this.containerElement.appendChild(this.sendUserB);
  }

  async sendUserAMessage() {
    const message = this.inputTextUserA.value;
    if (message !== '') {
      await this.innerController.sendMessage('UserA', message);
      this.inputTextUserA.value = '';
      await this.receiveMessage();  
    }
  }

  async sendUserBMessage() {
    const message = this.inputTextUserB.value;
    if (message !== '') {
      await this.innerController.sendMessage('UserB', message);
      this.inputTextUserB.value = '';
      await this.receiveMessage(); 
    }
  }

  async receiveMessage() {
    let messagesArray = await this.innerController.getMessage();   

      for (let element of messagesArray) 
      {
        const textArea = element.originID === 'UserA' ? this.textAreaUserB : this.textAreaUserA;
        textArea.value += `${element.originID}: ${element.body}\n`;
      }
      
   
  }

  connectedCallback() {
    
    this.sendUserA.addEventListener('click', () => this.sendUserAMessage());
    this.sendUserB.addEventListener('click', () => this.sendUserBMessage());

  }

  disconnectedCallback() {
    this.sendUserA.removeEventListener('click', () => this.sendUserAMessage());
    this.sendUserB.removeEventListener('click', () => this.sendUserBMessage());
  }
}

customElements.define('x-chat-application', ChatApplication);

export { ChatApplication };

