import { LightningElement , wire} from 'lwc';
import getParentAccounts from '@salesforce/apex/LwcController.getParentAccounts';
import Account_obj from '@salesforce/schema/Account';
import Account_ParentId from '@salesforce/schema/Account.ParentId';
import Account_Name from '@salesforce/schema/Account.Name';
import Account_SLAExpirationDate__c from '@salesforce/schema/Account.SLAExpirationDate__c';
import Account_NumberofLocations__c from '@salesforce/schema/Account.NumberofLocations__c';
import Account_Description from '@salesforce/schema/Account.Description';
import Account_SLA from '@salesforce/schema/Account.SLA__c';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { createRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
export default class AccountDetails extends NavigationMixin(LightningElement) {
    objName = Account_obj;
    parentOptions = [];
    parentValue = '';
    accName = ''; 
    slaDate = '';
    SLAType = '';
    selectednooflocations = '';
    desvalu = '';

    mapvalues(data)
    {
     return data.map((curitem)=> ({
            label : curitem.Name,
            value : curitem.Id
        }));
    }
    
    @wire(getParentAccounts)
    wiredParentData({data, error})
    {
        if(data)
        {
            console.log('data' , data);
            this.parentOptions = [...this.mapvalues(data)];
        }
        if(error)
        {
            console.log('error', error);
        }
    }

    @wire(getObjectInfo, {
        objectApiName : '$objName'
    })objinfo;

    @wire(getPicklistValues, {
        recordTypeId : '$objinfo.data.defaultRecordTypeId',
         fieldApiName : Account_SLA
    })
    slaOptions;

    handlechange(event)
    {
        let {name, value} = event.target;
        if(name === 'parentacc')
        {
            this.parentValue = value;
        }
        if(name === 'accountName'){
            this.accName = value;
        }
        if(name === 'sladate'){
            this.slaDate = value;
        }
        if(name === 'slatype'){
            this.SLAType = value;
        }
        if(name === 'nooflocation')
        {
            this.selectednooflocations = value;
        }
        if(name === 'desname'){
            this.desvalu = value;
        }
    }

    savehandler(){
        if(this.validatehandler())
        {
            let inputfields = {};
            inputfields[Account_Name.fieldApiName] = this.accName;
            inputfields[Account_ParentId.fieldApiName] = this.parentValue;
            inputfields[Account_SLA.fieldApiName] = this.SLAType;
            inputfields[Account_NumberofLocations__c.fieldApiName] = this.selectednooflocations;
            inputfields[Account_SLAExpirationDate__c.fieldApiName] = this.slaDate;
            inputfields[Account_Description.fieldApiName] = this.desvalu

            let recordInput = {
                apiName : Account_obj.objectApiName,
                fields : inputfields
            };
            createRecord(recordInput).then((result) =>{
                console.log('Account created successfully', result);
                this.navigatetorecord();
            }).catch((error) =>{
                console.log('Error in creation',error);
            })
        }else{
            console.log('record create avvaledhu');
        }
    }

    validatehandler(){
        let fields = Array.from(this.template.querySelectorAll('.validateme'));
        let isValid = fields.every(curitem => curitem.checkValidity());
        return isValid;
    }

    navigatetorecord(event)
    {
        let pageref = {
            type: 'standard__recordPage',
        attributes: {
            recordId: event.detail.id,
            objectApiName: Account_obj,
            actionName: 'view'
        }
        }
        this[NavigationMixin.Navigate](pageref)
    }
}