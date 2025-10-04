public with sharing class AccountTriggerHandler {
    public AccountTriggerHandler() {}
    public static void updateRating(list<Account> accounts)
    {
        for(Account acc : accounts){
            if(acc.Industry == 'Media' || acc.Industry == 'Energy')
            {
                acc.Rating = 'Hot';
            }
        }
    }
    public static void copingBillingtoShipping(list<Account> accounts)
    {
        for(Account acc : accounts)
        {
            if(acc.copyaddress__c == true)
            {
                acc.ShippingCity = acc.BillingCity;
                acc.ShippingCountry = acc.BillingCountry;
                acc.ShippingPostalCode = acc.BillingPostalCode;
                acc.ShippingState = acc.BillingState;
                acc.ShippingStreet = acc.BillingStreet;
            }
        }
    }
    public static void CreateRelContact(list<Account> accounts)
    {
        list<Contact> conlist = new list<Contact>();
        for(Account acc : accounts)
        {
            Contact con = new Contact();
                con.LastName = 'Test con';
                con.FirstName = acc.Name;
                con.Phone = acc.Phone;
                con.AccountId = acc.Id;

                conlist.add(con);
        }
        if(!conlist.isEmpty()){
            insert conlist;
        }
    }
}