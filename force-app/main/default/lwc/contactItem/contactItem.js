import { LightningElement , api} from 'lwc';

export default class ContactItem extends LightningElement {
    @api contact;

    handleclick(event)
    {
        event.preventDefault(); // It will prevnt the anchor element from navigation

        let customeevent = new CustomEvent('sampleevent', {
            detail : this.contact.Id
        });
        this.dispatchEvent(customeevent);
    } 
}