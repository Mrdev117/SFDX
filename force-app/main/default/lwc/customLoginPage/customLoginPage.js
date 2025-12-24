import { LightningElement, track } from 'lwc';
import communityLogin from '@salesforce/apex/CommunityLoginController.login';
export default class CustomLoginPage extends LightningElement {

    @track email='';
    @track password= '';
    @track error = '';

    handlechange(event)
    {
        const field = event.target.dataset.id;
        if(field === 'email'){
            this.email = event.target.value;
        }else if(field === 'password'){
            this.password = event.target.value;
        }
    }

    handleclick()
    {
        communityLogin({UserName : this.email, Password : this.password})
        .then(()=>{
            window.location.href = '/s/';
        }).catch(error =>{
            this.error = 'Invalid email or password. Please try again.';
            console.log(error);
        })
    }
}