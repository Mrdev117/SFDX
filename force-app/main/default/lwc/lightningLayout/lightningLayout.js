import { LightningElement , wire} from 'lwc';
import Get_Acc from '@salesforce/apex/getaccitems.getaccrec';
import Account_obj from '@salesforce/schema/Account';
import Acc_Name from '@salesforce/schema/Account.Name';
import Acc_Industry from '@salesforce/schema/Account.Industry';
import Acc_type from '@salesforce/schema/Account.Type';
import Con_obj from '@salesforce/schema/Contact';
import Con_fName from '@salesforce/schema/Contact.FirstName';
import Con_LName from '@salesforce/schema/Contact.LastName';
import Con_Phone from '@salesforce/schema/Contact.Phone';
export default class LightningLayout extends LightningElement {
account = Account_obj;
fields = [Acc_Name, Acc_Industry, Acc_type];
fields2 = [Con_LName, Con_Phone, Con_fName];
contact = Con_obj;
    // @wire(Get_Acc)
    // accrec({data, error})
    // {
    //     if(data){
    //         console.log(data);
    //         this.accounts = [...data];
    //     }
    //     if(error){
    //         console.log(error);
    //     }
    // }
}