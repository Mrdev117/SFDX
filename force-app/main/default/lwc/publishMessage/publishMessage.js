import { LightningElement , wire} from 'lwc';
import { MessageContext, publish } from 'lightning/messageService';
import Send_Message from '@salesforce/messageChannel/sendMessageContext__c';
export default class PublishMessage extends LightningElement {
    message;

    @wire(MessageContext)
    messageContext;

    messagehandler(event)
    {
        this.message = event.target.value;
    }

    handlepublish()
    {
        const messagePayload = {messageText : this.message}
        publish(this.messageContext, Send_Message, messagePayload);
    }
}