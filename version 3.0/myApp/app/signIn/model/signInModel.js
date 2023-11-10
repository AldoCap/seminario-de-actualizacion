
class FileToServer
{
    constructor(){

    }


async FileUploaderToServer(data)
{
    try {      
    
        this.InData = data;
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
            return true;  

        }else{

            alert("contraseña o usuario incorrecto");
            return false;
        }
    
    } catch (error) {
        console.log(error);
    }
}

}
export {FileToServer};