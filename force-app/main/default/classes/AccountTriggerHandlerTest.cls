@isTest
public with sharing class AccountTriggerHandlerTest {
    @isTest
    public static void updateRatingTest()
    {
        list<Account> acclist = new list<Account>();

        for(Integer i=1; i<=5; i++){
            Account acc = new Account();
                acc.Name = 'Test'+i;
                acc.Industry = 'Media';

                acclist.add(acc);
        }

        Test.startTest();
        insert acclist;
        Test.stopTest();

        list<Account> updatedlist = [select Id, Rating from Account where Id = : acclist[0].Id];

        system.assertEquals('Hot', updatedlist[0].Rating);
    }

    @isTest
    public static void copingBillingtoShippingTest()
    {
        list<Account> acclist = new list<Account>();

        for(Integer i=1; i<=5; i++)
        {
            Account acc = new Account();
                acc.Name = 'address Test' + i;
                acc.copyaddress__c = true;
                acc.BillingCity = 'Hyderabad';
                acc.BillingCountry = 'India';
                acc.BillingPostalCode = '500380';
                acc.BillingState = 'Telangana';
                acc.BillingStreet = 'SR Nagar';

                acclist.add(acc);
        }

        if(!acclist.isEmpty())
        {
            Test.startTest();
            insert acclist;
            Test.stopTest();
        }

        list<Account> updatedlist = [select Id, BillingCity from Account where Id =: acclist[0].Id];

        system.assertEquals('Hyderabad', updatedlist[0].BillingCity);
    }
    @isTest
    public static void CreateRelContactTest()
    {
        list<Account> acclist = new list<Account>();

        for(Integer i=1; i<=5; i++)
        {
            Account acc = new Account();
                acc.Name = 'Test '+i;
                acc.Industry = 'Media';

                acclist.add(acc);
        }
        if(!acclist.isEmpty())
        {
            Test.startTest();
            insert acclist;
            Test.stopTest();
        }

        list<Contact> createdlist = [select Id, LastName from Contact where AccountId =: acclist[0].Id];
        system.assert(createdlist != null, 'Contact is not created');
    }
}