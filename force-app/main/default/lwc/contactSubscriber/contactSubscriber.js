import { LightningElement, wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sendContact__c';
export default class ContactSubscriber extends LightningElement {
    
    subscription = null;
    pubMessage = '';
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscriptionchannel();
    }
    subscriptionchannel()
    {
        if(!this.subscription)
        {
            this.subscription = subscribe(this.messageContext, recordSelected,
                (message)=>this.handleChannel(message)
            )
        }
    }
    handleChannel(message)
    {
        this.pubMessage = message.lmsData
    }

    disconnectedCallback()
    {
        this.unsubscriptionchannel();
    }
    
    unsubscriptionchannel()
    {
        unsubscribe(this.subscription)
        this.subscription = null
    }

}