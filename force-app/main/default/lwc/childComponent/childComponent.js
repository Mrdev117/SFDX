import { LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {

   handleclick()
   {
        let selectevent = new CustomEvent('sampleevent');
        this.dispatchEvent(selectevent);
   }
}