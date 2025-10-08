public with sharing class PaginationDemoController {
    @Auraenabled(cacheable = true)
    public static list<Account> getAccounts()
    {
        list<Account> acclist = [select Id, Name, Type, Rating From Account Order By Id];
        return acclist;
    }

    @AuraEnabled(cacheable = true)
    public static list<Contact> getContacts()
    {
        list<Contact> conlist = [select Id, LastName, FirstName, Email, Phone, Department from Contact];
        return conlist;
    }
} 