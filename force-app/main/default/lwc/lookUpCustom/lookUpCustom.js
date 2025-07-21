import { LightningElement , wire, api} from 'lwc';
import searchResult from '@salesforce/apex/LookupController.searchResult';
const DELAY = 300;
export default class LookUpCustom extends LightningElement {

    @api iconName = 'standard:contact';
   @api apiName = 'Contact';
    searchdata;
   @api objectLabel = 'Contact'
    delayTimeout;
    selectedRecord = {
        selectedId : '',
        selectedName : ''
    };
    displayOptions = false;

    @wire(searchResult, {objectApiName : '$apiName', serachvalue : '$searchdata'})
    wiredata;
    
    // Hear we handling the entered key vlaue inside the input box using debouncing.
    searchvaluehandler(event){
        window.clearTimeout(this.delayTimeout);
        let enteredvalue = event.target.value;

        //Debouncing
      this.delayTimeout = setTimeout(()=>{
            this.searchdata = enteredvalue;
            this.displayOptions = true;
        }, DELAY)
    }

    foreachhandlerbutton(event){
        let selectedId = event.currentTarget.dataset.item;
        console.log('selected Id', selectedId);
        let outputRecord = this.wiredata.data.find((curitem)=> curitem.Id === selectedId)
        this.selectedRecord = {
            selectedId : outputRecord.Id,
            selectedName : outputRecord.Name
        };
        this.displayOptions = false;
    }

   get isRecordSelected()
   {
       return this.selectedRecord.selectedId === '' ? false : true;
   }
    
   removehandler(event)
   {
        this.selectedRecord = {
            selectedId : '',
            selectedName : ''
        };
        this.displayOptions = false;
   }
}