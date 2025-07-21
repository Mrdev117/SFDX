import { LightningElement } from 'lwc';

export default class LightningRecordPickerStatic extends LightningElement {
    showRecordId;
    handlechange(event)
    {
        this.showRecordId = event.detail.recordId;
        console.log('record ID is', this.showRecordId);
    }
}