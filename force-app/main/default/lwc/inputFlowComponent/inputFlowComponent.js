import { LightningElement,api } from 'lwc';
import {FlowAttributeChangeEvent} from 'lightning/flowSupport';

export default class InputFlowComponent extends LightningElement {

    @api inputvalue;

    handlechange(event){
        this.inputvalue = event.target.value;

        const attributevalue = new FlowAttributeChangeEvent(
            'inputvalue',
            this.inputvalue
        )
        this.dispatchEvent(attributevalue);
    }
}