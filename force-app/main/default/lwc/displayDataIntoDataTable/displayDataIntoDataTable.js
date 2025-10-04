import { LightningElement,wire, track } from 'lwc';
import getAccData from '@salesforce/apex/LwcController.getAccData';
import Account_obj from '@salesforce/schema/Account';
import Account_Industry from '@salesforce/schema/Account.Industry';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

const columns = [
    {label : 'Name', fieldName : 'Name'},
    {label : 'Industry', fieldName : 'Industry'},
    {label : 'Rating', fieldName : 'Rating'}
];

export default class DisplayDataIntoDataTable extends LightningElement {

    apiName = Account_obj
    @track IndustryOptions = [];
    selectedIndustry = '';
    @track acdata = [];
    accColumns = columns;

    @wire(getObjectInfo, {objectApiName : '$apiName'})
    accinfo;

    @wire(getPicklistValues, {recordTypeId : '$accinfo.data.defaultRecordTypeId',
        fieldApiName : Account_Industry})
    accdata({data, error})
    {
        if(data){
            console.log('data is ',data);
            this.IndustryOptions = data.values;
        }else if(error){
            console.log('error', error);
        }
    }

    handlechange(event){
        this.selectedIndustry = event.target.value;
    }

    clickhandler()
    {
        getAccData({inputIndustry : this.selectedIndustry})
            .then((result) =>{
                console.log('result is', result);
                this.acdata = result;
            }).catch((error) =>{
                console.log('got error', error);
            })
    }
}