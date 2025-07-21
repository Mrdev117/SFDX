import { LightningElement } from 'lwc';

export default class GrandParentComposition extends LightningElement {
    childEventhandler()
    {
        console.log('event handled in Grand Parent component - at Child level');
    }
}