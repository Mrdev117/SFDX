global with sharing class UpdatingContactMaillingCity implements Database.Batchable<SObject>
{
    global Database.QueryLocator start(Database.BatchableContext bc)
    {
        return Database.getQueryLocator([
            select Id, MailingCity, MailingCountry, MailingState, MailingPostalCode,MailingStreet,
                Account.BillingCity, Account.BillingState, Account.BillingStreet, Account.BillingCountry, Account.BillingPostalCode
                    from Contact where (MailingCity = null or MailingCountry = null or MailingPostalCode = null OR 
                                                MailingState = null OR MailingStreet = null) AND AccountId != null
        ]);
    }
    global void execute(Database.BatchableContext bc, List<SObject>scope)
    {
        list<Contact> conlist = new list<Contact>();
        for(Contact con : (list<Contact>) scope)
        {
            if(con.Account != null)
            {
                con.MailingCity = con.Account.BillingCity;
                con.MailingCountry = con.Account.BillingCountry;
                con.MailingState = con.Account.BillingState;
                con.MailingStreet = con.Account.BillingStreet;
                con.MailingPostalCode = con.Account.BillingPostalCode;

                conlist.add(con);
            }
        }
        if(!conlist.isEmpty())
        {
            update conlist;
        }
    }
    global void finish(Database.BatchableContext bc)
    {
        system.debug('contacts updated successfully: '+ bc.getJobId());
    }
}