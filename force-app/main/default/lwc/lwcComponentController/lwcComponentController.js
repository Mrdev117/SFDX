import { LightningElement , wire} from 'lwc';
import searchRecords from '@salesforce/apex/LwcController.searchRecords';
export default class LwcComponentController extends LightningElement {

    apiName= 'Account';
    searchdata = 'A'

    @wire(searchRecords, {objectApiName : '$apiName', searchvalue : '$searchdata'})
    getwiredata({data, error})
    {
        if(data)
        {
            console.log('acc data', data);
        }
        else if(error)
        {
            console.log('error', error);
        }
    }
}