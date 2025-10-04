import { LightningElement, wire, api } from 'lwc';
import Acc_Name from '@salesforce/schema/Account.Name';
import Acc_Ticker from '@salesforce/schema/Account.TickerSymbol';
import updateaccount from '@salesforce/apex/LwcController.updateaccount';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
export default class ImparitiveUpdation extends LightningElement {

    @api recordId;
    accName = '';
    tickerValue = '';

    @wire(getRecord, {
        recordId : '$recordId',
        fields : [Acc_Name, Acc_Ticker]
    })
    accinfo({data, error})
    {
        if(data){
            console.log('data is', data);
            this.accName = getFieldValue(data, Acc_Name);
            this.tickerValue = getFieldValue(data, Acc_Ticker);
        }else if(error){
            console.log('error is', error);
        }
    }
    changeHandler(event){
        this.tickerValue = event.target.value;
    }

    handleclick(){
        updateaccount({
            recordId : this.recordId,
            newTicker : this.tickerValue
        }).then((result) =>{
            console.log('result is', result);
            notifyRecordUpdateAvailable([{recordId: this.recordId}]);
        }).catch((error) =>{
            console.log('got error is', error);
        })
    }

}