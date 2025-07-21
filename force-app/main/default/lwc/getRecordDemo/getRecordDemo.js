import { LightningElement , wire, api} from 'lwc';
import Con_FirstName from '@salesforce/schema/Contact.FirstName';
import Con_Phone from '@salesforce/schema/Contact.Phone';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
export default class GetRecordDemo extends LightningElement {
    @api recordId;
    accName = '';
    conPhone;
    conName = '';
    conval;
    @wire(getRecord, {recordId : '$recordId', fields : [Con_FirstName, Con_Phone]})
    getDetails({data, error})
    {
        if(data)
        {
            console.log('data is', data);
            this.accName = data.fields.FirstName.value;
            this.conPhone = data.fields.Phone.value;
            this.conName =getFieldValue(data, Con_FirstName);
            this.conval = getFieldValue(data, Con_Phone);
        }
        else if(error){
            console.log(error);
        }
    }

}