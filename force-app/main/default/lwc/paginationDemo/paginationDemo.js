import { LightningElement, api, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/PaginationDemoController.getAccounts';
export default class PaginationDemo extends LightningElement {

    @track totalaccounts;
    visibleContacts;

    @wire(getAccounts)
    acclist({error, data})
    {
        if(data){
            this.totalaccounts = data;
            console.log('acc data :', data);
        }else if(error){
            console.log('acc got error :', error);
        }
    }

    updateAccHandler(event)
    {
        this.visibleContacts = [...event.detail.records];
        console.log(event.detail.records);
    }
}