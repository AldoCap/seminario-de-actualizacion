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
        this.InData = this.innerView.signInData(); 
 
        if (this.innerModel.FileUploaderToServer(this.InData)=== "true")
        {
            window.dispatchEvent(new CustomEvent('user-signed-in'));

        }else{
            window.dispatchEvent(new CustomEvent('user-signed-in'));
        }
    }

    onRegisterLinkClick()
    {
        window.dispatchEvent(new CustomEvent('signin-register-event'));
    
    }
}
export {signInController};