import {signInView } from './view/signInView.js';
import {signInController } from './controller/signInController.js';


class signIn extends HTMLElement {
    constructor() {
      super();
        this.viewReference = new signInView();
        this.controller = new signInController(this.viewReference,this.modelReference);
    }
  
    connectedCallback() {
        
        this.appendChild(this.viewReference);
        this.controller.enable();
    }

    disconnectedCallback()
    {}
  
  }
  
  customElements.define('x-sign-in', signIn);
  
  export { signIn }