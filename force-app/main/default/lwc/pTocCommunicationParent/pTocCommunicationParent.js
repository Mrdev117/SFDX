import { LightningElement } from 'lwc';
import Acc_obj from '@salesforce/schema/Account';
import Acc_Name from '@salesforce/schema/Account.Name';
import Acc_industry from '@salesforce/schema/Account.Industry';
import Acc_phone from '@salesforce/schema/Account.Phone';
export default class PTocCommunicationParent extends LightningElement {
    Account = Acc_obj;
    fields = [Acc_Name, Acc_industry, Acc_phone];
    confiels = false;
    childclick()
    { 
        this.confiels =! this.confiels;
        this.template.querySelector('c-p-toc-communication-child');
    }
}