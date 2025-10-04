import { LightningElement, track } from 'lwc';

export default class RecordPickerDemo extends LightningElement {
    
    @track filter = { criteria : [] };
    selectedConId = '';

    handlechange(event){
        this.selectedConId = event.detail.recordId;
        console.log('record Id : ', this.selectedConId);
        this.getfilters('ContactId', this.selectedConId);
    }

    getfilters(fieldPath, value)
    {
        this.filter = value ? {
            criteria : [
                {
                    fieldPath : fieldPath,
                    operator : 'eq',
                    value : value
                }
            ]
        } :
        { criteria : [] };
    }

    displayInfo = {
        primaryField: 'Contact.Name',
        additionalFields: ['Phone'],
    }
}