import { LightningElement , wire,api} from 'lwc';
import searchRecords from '@salesforce/apex/CustomLookupController.searchRecords';
const DELAY = 300;
export default class CustomLookup extends LightningElement {
    @api apiName = "Account";
    searchvalue;
    @api objectLabel = 'Account';
    @api iconName = 'standard:account';
    delayTimeout;
    selectedRecord = {
        selectedId : '',
        selectedName : ''
    };
    displayOptions = false;

    @wire(searchRecords, {objectApiName : '$apiName', searchKey : '$searchvalue'})
    outputs;

    changehandler(event)
    {
        window.clearTimeout(this.delayTimeout);
        let enteredvalue = event.target.value;

        //Debouncing - do not update the reactive Property as long as this function is being called within a delay
      this.delayTimeout = setTimeout(()=>{
            this.searchvalue = enteredvalue;
            this.displayOptions = true;
        }, DELAY)
    }
    clickhandler(event)
    {
        let selectedId = event.currentTarget.dataset.item;
        // console.log('selected Id', selectedId);
        let outputRecord = this.outputs.data.find((curitem)=> curitem.Id === selectedId);
        this.selectedRecord = {
            selectedId : outputRecord.Id,
            selectedName : outputRecord.Name
        };
        this.sendSelecton();
        this.displayOptions = false;
    }

    get isRecordSelected()
    {
        return this.selectedRecord.selectedId === '' ? false : true
    }

    removalhandler(event)
    {
        this.selectedRecord = {
            selectedId : '',
            selectedName : ''
        };
        this.sendSelecton();
        this.displayOptions = false
    }

    // custom Event for  anthoer project
    sendSelecton()
    {
        let mySelection = new CustomEvent('selectionrec', {
            detail : this.selectedRecord.selectedId
        });
        this.dispatchEvent(mySelection);
    }
}