import { LightningElement , wire, api} from 'lwc';
import getParentAccounts from '@salesforce/apex/LwcController.getParentAccounts';
import Account_obj from '@salesforce/schema/Account';
import Account_Id from '@salesforce/schema/Account.Id';
import Account_ParentId from '@salesforce/schema/Account.ParentId';
import Account_Name from '@salesforce/schema/Account.Name';
import Account_SLAExpirationDate__c from '@salesforce/schema/Account.SLAExpirationDate__c';
import Account_NumberofLocations__c from '@salesforce/schema/Account.NumberofLocations__c';
import Account_Description from '@salesforce/schema/Account.Description';
import Account_SLA from '@salesforce/schema/Account.SLA__c';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { createRecord, deleteRecord, getFieldValue, getRecord, updateRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const fields = [Account_ParentId, Account_Name, Account_SLAExpirationDate__c, Account_SLA, Account_NumberofLocations__c, Account_Description ];
export default class AccountDetails extends NavigationMixin(LightningElement) {
    objName = Account_obj;
    parentOptions = [];
    parentValue = '';
    accName = ''; 
    slaDate = '';
    SLAType = '';
    selectednooflocations = '';
    desvalu = '';
    @api recordId;

    @wire(getRecord, {
        recordId : '$recordId',
        fields : fields
    })
    wire_funciton({data, error})
    {
        if(data){
            this.parentValue = getFieldValue(data, Account_ParentId);
            this.accName = getFieldValue(data, Account_Name);
            this.slaDate = getFieldValue(data, Account_SLAExpirationDate__c);
            this.SLAType = getFieldValue(data, Account_SLA);
            this.selectednooflocations = getFieldValue(data, Account_NumberofLocations__c);
            this.desvalu = getFieldValue(data, Account_Description);
        }else if(error){
            console.log('error occer ', error);
        } 
    }
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

            //Updating record
            if(this.recordId)  {
                inputfields[Account_Id.fieldApiName] = this.recordId;
                let recordInput = {
                    fields : inputfields
                }
                updateRecord(recordInput).then((result) => {
                    console.log('updated record :'+ result);
                    this.ShowToast('Success!!', 'Account updation successfully: '+result.id, 'success');
                }).catch((error) =>{
                    console.log('error occered while updation :'+ error);
                })
                
                //Creating Record
            }else{
                let recordInput = {
                    apiName : Account_obj.objectApiName,
                    fields : inputfields
                };
                createRecord(recordInput).then((result) =>{
                    console.log('Account created successfully', result);
                    console.log('result id ', result.id);
                    this.ShowToast('Success!', 'Account record created successfully :'+ result.id, 'success');
                    this.navigatetorecord(result.id);
                }).catch((error) =>{
                    console.log('Error in creation',error);
                })
            }
        }else{
            console.log('record create avvaledhu');
            this.ShowToast('Error!', 'Error occered while creating acc record', 'error');
        }
    }

    validatehandler(){
        let fields = Array.from(this.template.querySelectorAll('.validateme'));
        let isValid = fields.every(curitem => curitem.checkValidity());
        return isValid;
    }

    canclehandler()
    {
        let allinputs = this.template.querySelectorAll('lightning-input')
            allinputs.foreach(input => {
                input.value = ''
            });
    }


    navigatetorecord(recordId)
    {
        let pageref = {
            type: 'standard__recordPage',
        attributes: {
            recordId: recordId,
            objectApiName: Account_obj,
            actionName: 'view'
        }
        }
        this[NavigationMixin.Navigate](pageref)
    }

    ShowToast(title, message, variant)
    {
        const eve = new ShowToastEvent({
            title, message, variant
        });
        this.dispatchEvent(eve);
    }

    get formTitle()
    {
        if(this.recordId){
            return 'Edit Account'
        }else{
            return 'Create Account'
        }
    }

    get isDeletebutton()
    {
        if(this.recordId)
        {
            return true;
        }else{
            return false;
        }
    }
    Deletehandler(){
        deleteRecord(this.recordId).then(() => {
            console.log('Record delete successfully');
            let pageref = {
                    type: 'standard__objectPage',
                attributes: {
                    objectApiName: Account_obj,
                    actionName: 'list'
                },
                state: {
                    filterName: 'Recent'
                }
            }
            this[NavigationMixin.Navigate](pageref);
        }).catch((error) =>{
            console.log('you cannot delete this record : ', error);
        })
    }
}