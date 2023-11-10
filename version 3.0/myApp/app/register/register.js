import {registerView } from './view/registerView.js';
import {registerController } from './controller/registerController.js';


class register extends HTMLElement {
    constructor() {
      super();
        this.viewReference = new registerView();
        this.controller = new registerController(this.viewReference,this.modelReference);
    }
  
    connectedCallback() {
        this.appendChild(this.viewReference);
        this.controller.enable();
    }

    disconnectedCallback() {
        this.removeChild(this.viewReference);
  
    }
  
  }
  
  customElements.define('x-register', register);
  
  export { register }