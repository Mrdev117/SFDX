import { LightningElement , wire} from 'lwc';
import getcontactlist from '@salesforce/apex/ContactController.getcontactlist';
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sendContact__c';
export default class ContactList extends LightningElement {
    condata = [];

    @wire(MessageContext)
    messageContext;

    @wire(getcontactlist) contacts({error, data}){
        if(data){
            console.log(data);
            this.condata = data;
        }
        else if(error)
        {
            console.log(error);
        }
    }
    selectedId;
    parenthandler(event)
    {
        let selectedconId = event.detail;
        this.selectedId = this.condata.find((curitem)=> curitem.Id === selectedconId);

        const payload = {lmsData : this.selectedconId};
        console.log('payload' , payload)
        publish(this.messageContext, recordSelected, payload);
    }
}