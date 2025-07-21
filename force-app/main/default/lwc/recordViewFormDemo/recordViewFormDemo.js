import { LightningElement , api, track} from 'lwc';
import Name_Field from '@salesforce/schema/Account.Name';
import Industry_Field from '@salesforce/schema/Account.Industry';
import Phone_Field from '@salesforce/schema/Account.Phone';
import Rating_Field from '@salesforce/schema/Account.Rating';
export default class RecordViewFormDemo extends LightningElement {

    @api recordId;
    @api objectApiName;

    @track fieldobj = {
        Name : Name_Field,
        Industry : Industry_Field,
        Phone : Phone_Field,
        Rating : Rating_Field
    }
}