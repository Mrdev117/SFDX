import { LightningElement , wire,track} from 'lwc';
import getAccData from '@salesforce/apex/LwcController.getAccData';
import Account_obj from '@salesforce/schema/Account';
import Account_Industry from '@salesforce/schema/Account.Industry';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
const columns = [
    {label : 'Name', fieldName : 'Name'},
    {label : 'Industry', fieldName : 'Industry'},
    {label : 'Rating', fieldName : 'Rating'}
];
export default class ImparitiveApexDemo extends LightningElement {
        apiName = Account_obj;
        @track data = [];
        columns = columns;
        @track IndustryOption= [];
        selectedIndustry = '';
    @wire(getObjectInfo, {objectApiName : '$apiName'})
    accinfo;

    @wire(getPicklistValues, {recordTypeId : '$accinfo.data.defaultRecordTypeId',
        fieldApiName : Account_Industry
    })
    accdata({data, error})
    {
        if(data){ 
            this.IndustryOption = data.values;
            console.log('data is', this.IndustryOption);
        }else if(error){
            console.log('error is', error);
        }
    }

    handlechange(event){
        this.selectedIndustry = event.target.value;
    }

    buttonhandler(){
        getAccData({
            inputIndustry : this.selectedIndustry
        }).then((result) => {
            this.data = result;
            console.log('data fetched: ', this.data);
        }).catch((error) =>{
            console.log('got error while fetching data: ', error);
        })
    }
}