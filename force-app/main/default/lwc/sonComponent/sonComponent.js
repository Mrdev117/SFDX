import { LightningElement, api } from 'lwc';
export default class SonComponent extends LightningElement {
    
    @api message;

   @api Showalert()
    {
        alert('message from child');
    }
}