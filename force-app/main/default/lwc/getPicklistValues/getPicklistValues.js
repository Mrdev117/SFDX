import { LightningElement ,wire} from 'lwc';
import Account_obj from '@salesforce/schema/Account';
import Acc_Industry from '@salesforce/schema/Account.Industry';
import { getObjectInfo, getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
export default class GetPicklistValues extends LightningElement {
    industryvalue;
    industryoptions;
    Ratingvalue;
    RatingOptions = [];
    Active = [];
    Activevalue;
    CustomerPriorityoptions = [];
    CustomerPriorityvalue;
    @wire(getObjectInfo, {objectApiName : Account_obj})
    objedetails;

    @wire(getPicklistValues, {recordTypeId : '$objedetails.data.defaultRecordTypeId', fieldApiName : Acc_Industry})
    outputfun({data, error})
    {
        if(data){
            console.log('Industry data is', data)
            this.industryoptions = data.values;
        }else if(error){
            console.log('error is', error);
        } 
    }

    @wire(getPicklistValuesByRecordType, {recordTypeId : '$objedetails.data.defaultRecordTypeId',
                                    objectApiName : Account_obj
    })
    getPicklistvalues({data, error})
    {
        if(data){ 
            console.log('picklist data', data);
            this.RatingOptions = [...this.valuesmap(data.picklistFieldValues.Rating)];
            this.Active = [...this.valuesmap(data.picklistFieldValues.Active__c)];
            this.CustomerPriorityoptions = [...this.valuesmap(data.picklistFieldValues.CustomerPriority__c)];
        }
        else if(error){
            console.error('errors is', error);
        }
    }

    valuesmap(data)
    {
       return data.values.map(item => ({'label':item.label, 'value':item.value}));
    }
    handlechange(event)
    {
        const {name, value} = event.target;
        if(name === 'Induatry'){
            this.industryvalue = value;
        }
        else if(name === 'Rating'){
            this.Ratingvalue = value;
        }
        else if(name === "Active")
        {
            this.Activevalue = value;
        }
        else if(name === 'customer')
        {
            this.CustomerPriorityvalue = value;
        }
    }
 }