import { LightningElement } from 'lwc';

export default class ParentComposition extends LightningElement { 
    childEventhandler(event)
    {
        console.log('Event handled in parent component - at the child level')
    }
    childDivEventhandler()
    {
        console.log('event handled in parent component - at the Div level');
    }
}