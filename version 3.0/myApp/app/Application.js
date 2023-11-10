import { signIn } from './signIn/signIn.js';
import { register} from './register/register.js';
import { ChatApplication} from './chat/chatView.js';
/*
class User extends EventTarget
{
	
};
class ChatModel extends EventTarget
{
	constructor(userA, userB)
	{
		userA.addEventListener('sendmessage', (e)=> userB.dispatchEvent('receivedmessage') );
		userB.addEventListener('sendmessage', (e)=> userA.dispatchEvent('receivedmessage') );

	}
	
	createSharedKey()
	{
		return sha256( uuid );
	}
	
	sendMessage( userTarget, message )
	{
		
	}
	
	getMessage()
	{
	
	}
	
}
*/
class Application extends HTMLElement {
    constructor() {
      super();

    }
    connectedCallback() {

       setTimeout(() => {

          this.viewReference = new signIn();
          this.appendChild(this.viewReference);
          
         this.setCallbacks();
       }, 1500);
    }
  
    setCallbacks() {
        window.addEventListener('nav-signin-event', () => { this.onSignInView();});
        window.addEventListener('nav-register-event', () => { this.onRegisterView();});

        window.addEventListener('register-signin-event', () => { this.onSignInView();});
        window.addEventListener('signin-register-event', () => { this.onRegisterView();});
        window.addEventListener('user-signed-in', () => { this.onChatView();});

    }

    onSignInView()
    {
       if (this.viewReference) {
         this.removeChild(this.viewReference)
       }
       this.viewReference = new signIn();
       this.appendChild(this.viewReference);
    }

    onRegisterView()
    {
       if (this.viewReference) {
         this.removeChild(this.viewReference)
       }
       this.viewReference = new register();
       this.appendChild(this.viewReference);
      }

      onChatView()
    {
       if (this.viewReference) {
         this.removeChild(this.viewReference)
       }
       this.viewReference = new ChatApplication();
       this.appendChild(this.viewReference);
      }
  
  }
  
  customElements.define('x-application', Application);
  
  export { Application }
