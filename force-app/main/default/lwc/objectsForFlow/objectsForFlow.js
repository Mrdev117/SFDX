import { LightningElement, api, track } from 'lwc';

export default class ObjectsForFlow extends LightningElement 
{

    @track _contacts = [];

    set contacts(contacts = []){
        this._contacts = [...contacts] // copy of array
    }

    @api
    get contacts(){
        return this._contacts;
    }

    get items(){
       let conEmailArray = this._contacts.map((curitem) => {
            return {
                type : 'icon',
                label : curitem.Email,
                name : curitem.Email,
                iconName : 'standard:contact',
                alternativeText : 'Contact Email'
            };
        });
        return conEmailArray;
    }
}