import { LightningElement, track } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountContactController.searchAccounts';
import getContactsByAccountId from '@salesforce/apex/AccountContactController.getContactsByAccountId';

export default class AccountContactLookup extends LightningElement {
    @track accountSearchKey = '';
    @track accountResults = [];
    @track contactResults = [];

    selectedAccountId = null;

    get isContactDisabled() {
        return !this.selectedAccountId;
    }

    async handleAccountSearch(event) {
        this.accountSearchKey = event.target.value;
        if (this.accountSearchKey.length >= 1) {
            this.accountResults = await searchAccounts({ keyword: this.accountSearchKey });
        } else {
            this.accountResults = [];
        }
    }

    handleAccountSelect(event) {
        const selectedName = event.target.innerText;
        const selected = this.accountResults.find(acc => acc.Name === selectedName);
        this.selectedAccountId = selected.Id;

        // Set input box value manually
        this.template.querySelector('lightning-input[label="Search Account"]').value = selected.Name;

        // Clear dropdown
        this.accountResults = [];
        this.contactResults = []; // reset previous contact list
    }

    async handleContactFocus() {
        if (this.selectedAccountId) {
            this.contactResults = await getContactsByAccountId({ accountId: this.selectedAccountId });
        }
    }
}