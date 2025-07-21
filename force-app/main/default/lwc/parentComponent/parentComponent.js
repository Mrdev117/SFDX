import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    displayMessage = false;

    handler(event)
    {
        this.displayMessage =! this.displayMessage;
    }
}