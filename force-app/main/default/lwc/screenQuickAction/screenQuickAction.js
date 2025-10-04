import { LightningElement , api, track} from 'lwc';
import Account_Name from '@salesforce/schema/Account.Name'
import Account_Industry from '@salesforce/schema/Account.Industry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from "lightning/actions";
export default class ScreenQuickAction extends LightningElement {

    @api recordId;
    @api objectApiName;

    @track fields = {
        accName : Account_Name,
        accIndustry : Account_Industry
    };

    closeModal(){
        this.dispatchEvent(new CloseActionScreenEvent())
    }

    successHandler(event)
    {
        this.showToast('Success!!', 'Account Created Successfully!!'+ event.detail.id, 'success');
        this.dispatchEvent(new CloseActionScreenEvent())
    }
    showToast(title, message, variant)
    {
        this.dispatchEvent(new ShowToastEvent({
            title, message, variant
        }));
    }
}   