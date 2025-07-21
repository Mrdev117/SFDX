import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement , wire} from 'lwc';
import Send_Message from '@salesforce/messageChannel/sendMessageContext__c';
export default class SubscribeMessage extends LightningElement {
    subscrption = null;
    reciveMessage;
    isUnsubscribebutton = true;

    @wire(MessageContext)
    messageContext;

    connectedCallback()
    {
        this.SendMessageChannel();
    }

    SendMessageChannel()
    {
        if(!this.subscrption)
        {
            this.subscrption = subscribe(
            this.messageContext, Send_Message, 
            (message) => this.handleMessage(message));
        }
    }

    handleMessage(message)
    {
            this.reciveMessage = message.messageText;
            this.isUnsubscribebutton = false; 
    }

    disconnectedCallback()
    {
        this.unsubscribeChannel();
    }

    unsubscribeChannel()
    {
        if(this.subscrption)
        {
            unsubscribe(this.subscrption)
            this.subscrption = null; 
        }   
    }

    handlerUnsubscribe()
    {
        this.unsubscribeChannel();
        this.reciveMessage = '';
        this.isUnsubscribebutton = true;
    }
}