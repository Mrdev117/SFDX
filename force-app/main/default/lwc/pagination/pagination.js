import { LightningElement , api} from 'lwc';

export default class Pagination extends LightningElement {

    totalRecords;
    recordSize = 5;

    @api
    set records(data)
    {
        if(data){
            this.totalRecords = data;
            this.visibleRecords = data.slice(0, this.recordSize)
            console.log('visible :', this.visibleRecords);
            this.totalPages = Math.floor(data.length/this.recordSize);
            console.log('total pages :', this.totalPages);
            this.updateRecords();
        }
    }

    get records()
    {
        return this.visibleRecords;
    }
    previousHandler(){

    }

    nextHandler(){

    }

    updateRecords()
    {
        this.dispatchEvent(new CustomEvent('update', {
            detail : {
                records : this.visibleRecords
            }
        }))
    }

    
}