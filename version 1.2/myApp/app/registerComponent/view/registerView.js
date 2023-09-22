class registerView extends HTMLElement
{
    constructor()
    {
        super();

        this.form = document.createElement('form');  
        this.form.classList.add('form');    
       
        this.registerTitle = document.createElement('p');
        this.registerTitle.classList.add('registerTitle');
        this.registerTitle.textContent = 'Registrarse';              

        this.inputName = document.createElement('input');
        this.inputName.type = 'text'; 
        this.firstNameLabel = document.createElement('label');
        this.firstNameLabel.innerText = "Nombre"; 

        this.inputSurname = document.createElement('input');
        this.inputSurname.type = 'text'; 
        this.lastNameLabel = document.createElement('label');
        this.lastNameLabel.innerText = "Apellido"; 

        this.inputEmail = document.createElement('input');
        this.inputEmail.type = 'text'; 
        this.emailLabel = document.createElement('label');
        this.emailLabel.innerText = "Email"; 

        this.inputPhone = document.createElement('input');
        this.inputPhone.style = 'text'; 
        this.phoneLabel = document.createElement('label');
        this.phoneLabel.innerText = "Telefono"; 

        this.inputDni = document.createElement('input');
        this.inputDni.type = 'text'; 
        this.dnidLabel = document.createElement('label');
        this.dnidLabel.innerText = "Dni"; 

        this.inputPassword = document.createElement('input');
        this.inputPassword.type = 'text'; 
        this.passwordLabel = document.createElement('label');
        this.passwordLabel.innerText = "Contraseña"; 

        this.inputConfirmPassword = document.createElement('input');
        this.inputConfirmPassword.type = 'text'; 
        this.confirmPasswordLabel = document.createElement('label');
        this.confirmPasswordLabel.innerText = "Confirmar Contraseña"; 

        this.submitButton = document.createElement('button');
        this.submitButton.classList.add('submit');
        this.submitButton.textContent = 'Enviar';
        this.submitButton.id= "submitButton";
        
        this.signIn = document.createElement('p'); 
        this.signIn.classList.add('signin');
        this.signIn.innerHTML = 'Ya tienes una cuenta?';
        this.signInLink = document.createElement('a');
        this.signInLink.innerHTML = "Ir a inicio";
        this.signInLink.id = "signInLink";

        this.form.appendChild(this.registerTitle);

        this.form.appendChild(this.firstNameLabel);
        this.form.appendChild(this.inputName);
        this.form.appendChild(this.lastNameLabel);
        this.form.appendChild(this.inputSurname);
        this.form.appendChild(this.emailLabel);
        this.form.appendChild(this.inputEmail);
        this.form.appendChild(this.phoneLabel);
        this.form.appendChild(this.inputPhone);
        this.form.appendChild(this.dnidLabel);
        this.form.appendChild(this.inputDni);
        this.form.appendChild(this.passwordLabel);
        this.form.appendChild(this.inputPassword);
        this.form.appendChild(this.confirmPasswordLabel);
        this.form.appendChild(this.inputConfirmPassword);
        this.form.appendChild(this.submitButton);

        this.signIn.appendChild(this.signInLink);
        this.form.appendChild(this.signIn);

        this.appendChild(this.form);

    }

    connectedCallback()
    {}

    disconnectedCallback()
    {}

    
    getRegisterData() {
      let userDataRegister = {
            'password'  : this.inputPassword.value,
            'name'      : this.inputName.value,
            'surname'   : this.inputSurname.value,
            'dni'       : this.inputDni.value,
            'email'     : this.inputEmail.value,
            'phone'     : this.inputPhone.value      

      }
      return userDataRegister;
    }
}

customElements.define('x-register-view', registerView);
  
export { registerView }