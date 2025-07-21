import { LightningElement, wire } from 'lwc';
import getConDetails from '@salesforce/apex/LwcController.getConDetails';
import { createRecord } from 'lightning/uiRecordApi';
import Contact_obj from '@salesforce/schema/Contact';
import Contact_AccountId from '@salesforce/schema/Contact.AccountId';
import Con_Fname from '@salesforce/schema/Contact.FirstName';
import Con_Lname from '@salesforce/schema/Contact.LastName';
import Con_Phone from '@salesforce/schema/Contact.Phone';
import Con_Email from '@salesforce/schema/Contact.Email';
export default class ConCreateRecordUsingWire extends LightningElement {

    paretnOptions = [];
    parentvalue = '';
    conFname = '';
    conLname = '';
    phoneval = null;
    emailvalue = '';

    @wire(getConDetails)
    accrecord({error, data})
    {
        if(data){
            console.log('acc data', data);
            this.paretnOptions = [...this.mapvalues(data)];
        }else if(error){
            console.log('error is', error);
        }
    }
    
    mapvalues(data)
    {
        return data.map((curitem) => ({
            label : curitem.Name,
            value : curitem.Id
        }))
    }

    SaveClick(event)
    {
        if(this.validateinput())
        {
            let inputfields = {}
            inputfields[Contact_AccountId.fieldApiName]=this.parentvalue;
            inputfields[Con_Fname.fieldApiName] = this.conFname;
            inputfields[Con_Lname.fieldApiName] = this.conLname;
            inputfields[Con_Phone.fieldApiName] = this.phoneval;
            inputfields[Con_Email.fieldApiName] = this.emailvalue;
           let recordInput = {
                apiName : Contact_obj.objectApiName,
                fields : inputfields
            }
            createRecord(recordInput).then((result) => {
                console.log('con obj data :', result);
            }).catch((error) =>{
                console.log('con got errro :', error);
            });
        }
    }

    validateinput()
    {
        let fields = Array.from(this.template.querySelectorAll('.validate'));
        let isvalid = fields.every((curitem) => curitem.checkValidity());
        return isvalid;
    }
    handlechange(event)
    {
        const {name, value} = event.target;
        if(name === 'accname')
        {
            this.parentvalue = value;
        }
        if(name === 'conname')
        {
            this.conLname = value;
            console.log('con L name', this.conLname);
        }
        else if(name === 'confname')
        {
            this.conFname = value;
        }
        else if(name === 'Phone')
        {
            this.phoneval = value;
        }
        else if(name === 'emailname')
        {
            this.emailvalue = value;
        }
    }

    cancleclick()
    {
        // this.parentvalue = '';
        // this.conLname = '';
        // this.conFname = '';
        // this.phoneval = null;
        // this.emailvalue = ''; 

        const allInputs = this.template.querySelectorAll('lightning-input');
            allInputs.forEach(input => {
            input.value = '';
        });
        
        const combo = this.template.querySelector('lightning-combobox');
        if (combo) combo.value = '';
    }
}