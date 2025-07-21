import { LightningElement , wire, api} from 'lwc';
import { getRecords } from 'lightning/uiRecordApi';
import Con_Name from '@salesforce/schema/Contact.Name';
import Opp_Name from '@salesforce/schema/Opportunity.Name';
export default class GetRecordsDemo extends LightningElement {
    outputs;
    error;
    @wire(getRecords, {
        records : [
            {
                recordIds : ['003gL000005oj4IQAQ'],
                fields : [Con_Name]
            },
            {
                recordIds : ['006gL000007jW56QAE'],
                fields : [Opp_Name]
            }
        ]
    })
    output({data, error})
    {
        if(data){
            console.log('data is', data);
            this.outputs = data;
            this.error = null
        }
        if(error){
            console.log('error is', error);
            this.error = error;
            this.outputs = null
        }
    }
}