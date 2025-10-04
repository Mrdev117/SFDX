@isTest
public with sharing class CaseTriggerHandlerTest {
    @isTest
    public static void PopulateLatestCaseNumberTest()
    {
        list<Account> acclist = new list<Account>();
        list<Case> caselist = new list<Case>();

        for(Integer i=1; i<=5; i++)
        {
            Account acc = new Account();
                acc.Name = 'Test acc '+ i;

                acclist.add(acc);
        }
        insert acclist;

        for(Account acc : acclist)
        {
            Case cs = new Case();
                cs.Status = 'New';
                cs.Origin = 'Phone';
                cs.AccountId = acc.Id;

                caselist.add(cs);
        }
        if(!caselist.isEmpty())
        {
            Test.startTest();
            insert caselist;
            Test.stopTest();
        }

        list<Account> updatedacc = [select Id,Latest_Case_No__c from Account where Id IN : acclist];
       
        for(Account acc : updatedacc)
        {
            system.assertNotEquals(null, acc.Latest_Case_No__c, 'Each Account should have latest case no ');
        }
    }
}