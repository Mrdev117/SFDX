import { LightningElement, track } from 'lwc';
export default class AccountContactPicker extends LightningElement {
    
    selectedAccId = '';
    selectedContact = '';
    @track filter = { criteria : [] }
    handlechage(event){
        this.selectedAccId = event.detail.recordId;
        console.log('Id is', this.selectedAccId);
        this.updatefiltes('AccountId', this.selectedAccId);
    }


    updatefiltes(fieldpath, value){
        console.log(`fieldpath ${fieldpath}, and value ${value}`);

      this.filter = value ? {
        criteria : [
        {
            fieldPath : fieldpath,
            operator : 'eq',
            value : value
        }
    ]
    } : {criteria : []};

    }
    


}
