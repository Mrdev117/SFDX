import { LightningElement } from 'lwc';
export default class DadComponent extends LightningElement {
    
    msg = 'hello'
    handleclick()
    {
        this.templet.querySelector('c-son-component').Showalert();
    }
}