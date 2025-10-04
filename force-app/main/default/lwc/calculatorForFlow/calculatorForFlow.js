import { LightningElement, api } from 'lwc';
import {
    FlowAttributeChangeEvent,
    FlowNavigationNextEvent,
} from 'lightning/flowSupport';
export default class CalculatorForFlow extends LightningElement {


    @api num1 = '';
    @api num2 = '';
    @api output = '';
    handleclick(event){
        let name = event.target.name;

        if(name === 'add'){
            this.output = parseInt(this.num1) + parseInt(this.num2);
        }else if(name === 'sub'){
            this.output = parseInt(this.num1) - parseInt(this.num2);
        }else if(name === 'mul'){
            this.output = parseInt(this.num1) * parseInt(this.num2);
        }else if(name === 'div'){
            this.output = parseInt(this.num1) / parseInt(this.num2);
        }

        const actflow = new FlowAttributeChangeEvent(
            'output',
            this.output
        );
        this.dispatchEvent(actflow);
    }
}