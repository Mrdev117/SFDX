import { LightningElement, api } from 'lwc';
import Name_Field from '@salesforce/schema/Account.Name';
import Industry_Field from '@salesforce/schema/Account.Industry';
import Phone_Field from '@salesforce/schema/Account.Phone';
import Rating_Field from '@salesforce/schema/Account.Rating';
import AnnualRevenue_Field from '@salesforce/schema/Account.AnnualRevenue';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class RecordFormDemo extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;

    fieldsList = [Name_Field, Industry_Field, Phone_Field, Rating_Field, AnnualRevenue_Field];

    Dummymethod(event)
    {
        this.showToast();
        this.navigationtoRecordPage(event.detail.id);
    }
    showToast()
    {
        const eve = new ShowToastEvent({
            title : 'Success!!',
            message : 'Record Successfully updated',
            variant : 'success'
        });
        this.dispatchEvent(eve);
        
    }

    navigationtoRecordPage(recordId)
    {
        let pageRef = {
           type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName : this.objectApiName,
                actionName: 'view',
            }
        }
        this[NavigationMixin.Navigate](pageRef);
    }
}