import { LightningElement , wire} from 'lwc';
import Account_obj from '@salesforce/schema/Account';
import Sla_Type from '@salesforce/schema/Account.SLA__c';
import Account_Name from '@salesforce/schema/Account.Name';
import Account_Parent from '@salesforce/schema/Account.ParentId';
import Account_ExE_Date from '@salesforce/schema/Account.SLAExpirationDate__c';
import Account_Location from '@salesforce/schema/Account.NumberofLocations__c';
import Account_Dec from '@salesforce/schema/Account.Description';
import getParentAccounts from '@salesforce/apex/LwcController.getParentAccounts';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';
export default class AccCreateRecordUsingWire extends NavigationMixin(LightningElement) {
    objapiName = Account_obj
    parentOptions = [];
    parentValue = '';
    slaoptions = [];
    SLAtype = '';
    SlaDate = null;
    accName = '';
    selectednooflocations = '3';
    Desvalue = '';
    isdisabeld = false;
    @wire(getParentAccounts)
    parentinfo({data, error})
    {
        if(data){
            console.log('accdata', data);
            this.parentOptions = [...this.comboboxvalues(data)];
        }
        if(error){
            console.log('error', error);
        }
    }

    comboboxvalues(data){
        return data.map((curitem)=>({
            label : curitem.Name,
            value : curitem.Id
        }))
    }

    @wire(getObjectInfo, {objectApiName : '$objapiName'})
    accinfo;
    
    @wire(getPicklistValues, {recordTypeId : '$accinfo.data.defaultRecordTypeId',
        fieldApiName : Sla_Type
    })acctype({data, error}){
        if(data){
            console.log('sla data', data);
            this.slaoptions = data.values;
        }else if(error){
            console.log('sla error', error);
        }
    }

    handleChange(event)
    {
        const {name, value} = event.target;
        if(name === 'parentName'){
            this.parentValue = value;
        }
        else if(name === 'accName')
        {
            this.accName = value;
        }
        else if(name === 'sladate')
        {
            this.SlaDate = value;
        }
        else if(name === 'slatype')
        {
            this.SLAtype = value;
        }
        else if(name === 'locationname')
        {
            this.selectednooflocations = value;
        }
        else if(name === 'Desname')
        {
            this.Desvalue = value;
        }
    }
//button functionality
    saveclick(event)
    {
       if(this.validateInput())
       {
            
            let inputFields = {}
            inputFields[Account_Name.fieldApiName] = this.accName;
            inputFields[Account_Parent.fieldApiName] = this.parentValue;
            inputFields[Account_ExE_Date.fieldApiName] = this.SlaDate;
            inputFields[Account_Location.fieldApiName] = this.selectednooflocations;
            inputFields[Account_Dec.fieldApiName] = this.Desvalue;
            inputFields[Sla_Type.fieldApiName] = this.SLAtype;
            let recordInput = {
                apiName : Account_obj.objectApiName,
                fields : inputFields
            }
            createRecord(recordInput).then((result) =>{
                console.log('Account creation successfully :', result);
                this.showToast('Success', 'Account create successfully : '+ result.id, 'success');
                this.navigate(result.id);
            }).catch((error) => {
                console.log('got a error while creating account record :' , error);
            })
       }
    }

    validateInput()
    {
        let fields = Array.from(this.template.querySelectorAll('.validateme'));
        let isValid = fields.every((curitem) => curitem.checkValidity());
        return isValid;
    }

    showToast(title, message, variant)
    {
        const eve = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(eve);
    }

    navigate(recordId)
    {
        let pageref = {
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName : Account_obj,
                actionName: 'view',
            },
        }
        this[NavigationMixin.Navigate](pageref);
    }
}