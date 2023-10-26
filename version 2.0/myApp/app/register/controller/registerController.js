class registerController
{
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
                case "submitButton":
                   this.onSubmitRegisterClick();
        
                    break;
                
                case "signInLink":
                    this.onSignInLinkClick();
                    break;
            }            
        })
    }

    disable()
    {}

    async onSubmitRegisterClick()
    {
        
        let dataNewUser  =this.innerView.getRegisterData();

        try {
      
            let requestMetadata = {
                method: "POST",
                body:JSON.stringify( dataNewUser),
              };
    
            let result = await fetch ("http://localhost:3000/register", requestMetadata);    
            let jsonBody = await result.json();

            console.log(jsonBody);
            alert(jsonBody.message);

          } catch (error) {
            console.log("error");

            alert(error.message);
          }
        
    }

    onSignInLinkClick()
    {
        window.dispatchEvent(new CustomEvent('register-signin-event'));
    }
}

export {registerController};