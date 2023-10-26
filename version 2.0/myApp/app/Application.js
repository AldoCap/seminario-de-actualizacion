import { signIn } from './signIn/signIn.js';
import { register} from './register/register.js';


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
  
  }
  
  customElements.define('x-application', Application);
  
  export { Application }