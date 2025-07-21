import { LightningElement, api } from 'lwc';
import Con_obj from '@salesforce/schema/Contact';
import Con_Fname from '@salesforce/schema/Contact.FirstName';
import Con_Lname from '@salesforce/schema/Contact.LastName';
import Con_Phone from '@salesforce/schema/Contact.Phone';
export default class PTocCommunicationChild extends LightningElement {

    
     @api contact = Con_obj;
     @api fields = [Con_Fname, Con_Lname, Con_Phone];
    
}