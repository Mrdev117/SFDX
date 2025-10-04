import { LightningElement, api, track } from 'lwc';

export default class CalculatorComponent extends LightningElement {

    @api firstnum;
    @api secondnum;
    @api result;

    changehandler(event){
        const {name, value} = event.target;

        if(name === 'number1'){
            this.firstnum = value;
        }else if(name === 'number2'){
            this.secondnum = value;
        }else if(name === 'result'){
            this.result = value;
        }
    }

    addhandler(){
        this.result = parseInt(this.firstnum) + parseInt(this.secondnum);
    }
    subhandler(){
        this.result = parseInt(this.firstnum) - parseInt(this.secondnum);
    }
    mulhandler(){
        this.result = parseInt(this.firstnum) * parseInt(this.secondnum);
    }
    divhandler(){
        this.result = parseInt(this.firstnum) / parseInt(this.secondnum);
    }
}