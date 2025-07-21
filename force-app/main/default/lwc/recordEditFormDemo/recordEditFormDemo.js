import { LightningElement , api, track} from 'lwc';
import Account_obj from '@salesforce/schema/Account';
import Name_Field from '@salesforce/schema/Account.Name';
import Industry_Field from '@salesforce/schema/Account.Industry';
import Phone_Field from '@salesforce/schema/Account.Phone';
import AnnualRevenue_Field from '@salesforce/schema/Account.AnnualRevenue';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class RecordEditFormDemo extends NavigationMixin(LightningElement) {
    @api objectApiName = Account_obj;
    @api recordId;

    @track fields = {
        Name : Name_Field, 
        Industry : Industry_Field,
        Phone : Phone_Field,
        Revenue : AnnualRevenue_Field
    };

    handlesuccess(event)
    {
        this.showtoast();
        this.navigation(event.detail.id);
    }

    showtoast(event)
    {
        const eve = new ShowToastEvent({
            title : 'success!!',
            message : 'Account created successfully'+ event.detail.id,
            variant : 'success'
        });
        this.dispatchEvent(eve);
    }

    navigation(recordId)
    {
        let pageref = {
            type : 'standard__recordPage',
            attributes : {
                objectApiName : this.objectApiName,
                recordId : recordId,
                actionName : 'view'
            }
        };
        this[NavigationMixin.Navigate](pageref);
    }
    errorhandler(event)
    {
        console.log('error is', event.detail);
        const erroreve = new ShowToastEvent({
            title :'Error!',
            message :'error while creating record',
            variant : 'error'
        })
        this.dispatchEvent(erroreve);
    }

    submithandler(event)
    {
        event.preventDefault();
        console.log(JSON.stringify(event.detail));

        const fields = event.detail.fields;
        if(!fields.Industry)
        {
            fields.Industry = 'Energy';
        }
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    resethandler()
    {
        let inputfields = this.template.querySelectorAll('lightning-input-field');
        inputfields.forEach((curitem) => curitem.reset()); 
    }
}