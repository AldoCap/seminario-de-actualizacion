class signInController{
    constructor(viewReference, modelReference)
    {
        this.innerView = viewReference;
        this.innerModel = modelReference;
       
    }

    enable()
    {
        this.innerView.addEventListener('click', (e) => {
            const target = e.target.id;
            
            switch(target)
            {
                case "signIn":
                    
                    this.onSignInButtonClick();
                    
                    break;
                
                case "registerLink":
                    this.onRegisterLinkClick();
                    break;
            }            
        })
    }

    disable()
    {}

    async onSignInButtonClick(event)
    {
        this.InData = this.innerView.signInData()
        
        try {      
            
            let requestMetadata = {
                method: "POST",
                body:JSON.stringify(this.InData),
              };
            
            let result = await fetch ("http://localhost:3000/signIn", requestMetadata);
            
            this.jsonBody = await result.json();
            
            if (this.jsonBody.data.userId.status === true)
            {
                console.log(this.jsonBody); 
                localStorage.setItem('nickname', this.InData.userName);
                localStorage.setItem('token', this.jsonBody.data.token);
                window.dispatchEvent(new CustomEvent('signed'));
           
            }else{
                alert("contraseña o usuario incorrecto"); 
            }
        
        } catch (error) {
            console.log(error);
        }
    }

    onRegisterLinkClick()
    {
        window.dispatchEvent(new CustomEvent('signin-register-event'));
    
    }
}
export {signInController};