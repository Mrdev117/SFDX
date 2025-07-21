import { LightningElement, api } from 'lwc';
import AccData from '@salesforce/apex/LwcController.AccData'; 
export default class DisplayData extends LightningElement {

    // @api accounts;
    searchkeyword = '';
    fetchresultData;
    @api 
    set keys(value)
    {
        this.searchkeyword = value;
        this.fetchresult();
    }
    get keys()
    {
        return this.searchkeyword;
    }

    fetchresult()
    {
        if(this.searchkeyword && this.searchkeyword.length >= 2)
        {
            AccData({keyword : '$this.searchkeyword'})
            .then(result =>{
                this.fetchresultData = result
            }).catch(error =>{
                console.log('error fetching accounts ', error);
                this.fetchresultData = [];
            })
        }else{
            this.fetchresultData = [];
        }
    }
}