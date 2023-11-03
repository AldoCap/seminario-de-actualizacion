class signInView extends HTMLElement
{
    constructor()
    {
        super();

        this.formContainer = document.createElement('div');
        this.formContainer.classList.add("form-container");

        this.signInTitle = document.createElement('p');
        this.signInTitle.classList.add("title");
        this.signInTitle.textContent = "Formulario de inicio de sesión";

        this.form = document.createElement('div');
        this.form.classList.add("form");
        
        this.userNickNameContainer = document.createElement('div');  
        this.userNickNameContainer.classList.add("input-group");

        this.userNameInput = document.createElement('input');
        this.userNameLabel = document.createElement('label');
        this.userNameLabel.innerHTML = "Usuario";
        
        this.userNameLabel.for = this.userNickNameInput;

        this.passwordContainer = document.createElement('div');
        this.passwordContainer.classList.add("input-group");

        this.passwordLabel = document.createElement('label');
        this.passwordLabel.for = this.inputPassword;
        this.passwordLabel.innerHTML = "Contraseña";

        this.inputPassword = document.createElement('input');
        this.inputPassword.type = "password"; 
        
        this.buttonSignIn = document.createElement('button');
        this.buttonSignIn.classList.add("sign");
        this.buttonSignIn.innerHTML = "Iniciar sesión ";
        this.buttonSignIn.id = "signIn";

        this.p = document.createElement('p');     
        this.p.classList.add('registro');   
        this.p.innerHTML = "No tienes una cuenta? ";

        this.register = document.createElement('a'); 
        this.register.innerHTML = "Registrarse";
        this.register.id= "registerLink";

        this.form.appendChild(this.userNickNameContainer);
        this.form.appendChild(this.passwordContainer);
        this.form.appendChild(this.buttonSignIn);      

        this.p.appendChild(this.register);

        this.userNickNameContainer.appendChild(this.userNameLabel);
        this.userNickNameContainer.appendChild(this.userNameInput);

        this.formContainer.appendChild(this.signInTitle);
        this.formContainer.appendChild(this.form);
        this.formContainer.appendChild(this.p);

        this.passwordContainer.appendChild(this.passwordLabel);
        this.passwordContainer.appendChild(this.inputPassword); 

        this.appendChild(this.formContainer);
    }

    connectedCallback()
    {}

    disconectedCallback()
    {}

    signInData(){
      let userDataRegister = {
        'userName'  : this.userNameInput.value,
        'password'  : this.inputPassword.value,
      }
   
      return userDataRegister;
    }

}

customElements.define('x-sign-in-view', signInView);
  
export { signInView}