import { LightningElement, wire } from 'lwc';
import getAccDetails from '@salesforce/apex/LwcController.getAccDetails';
export default class GetAccData extends LightningElement {
    // accountList;

    // @wire(getAccDetails)
    // wiredAccounts({ data, error }) {
    //     if (data) {
    //         this.accountList = data;
    //     } else if (error) {
    //         console.error(error);
    //     }
    // }
    searchterm = '';
    handlekeyup(event)
    {
        this.searchterm = event.target.value;
    }
}