import { LightningElement , wire} from 'lwc';
import Account_obj from '@salesforce/schema/Account';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
export default class GetObjectInfoApi extends LightningElement {
    accountinfo;
    accerror;
    @wire(getObjectInfo, {objectApiName : Account_obj})
    getobjdetails({data, error})
    {
        if(data){
            console.log('obj data', data);
            this.accountinfo = data;
        }
        else if(error)
        {
            console.log('error is',error);
            this.accerror = error;
        }
    }
}