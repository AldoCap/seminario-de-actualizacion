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
        //event.preventDefault();
        
        let InData = this.innerView.signInData()
        
        try {      
            
            let requestMetadata = {
                method: "POST",
                body:JSON.stringify(InData),
              };
            
            let result = await fetch ("http://localhost:3000/signIn", requestMetadata);
            
            let jsonBody = await result.json();

            console.log(jsonBody.id, "holis")
            /*
            if (jsonBody === true){
                
                localStorage.setItem('nickname', InData.nickname);
                localStorage.setItem('id', jsonBody.id);
                localStorage.setItem('token', 'john@example.com');
                window.dispatchEvent(new CustomEvent('signed'));
                console.log("holis compa "); 
            }
            */  
        
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