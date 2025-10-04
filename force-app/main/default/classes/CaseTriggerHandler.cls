public with sharing class CaseTriggerHandler {
    public static void PopulateLatestCaseNumber(list<Case> cases)
    {
        list<Account> acclist = new list<Account>();

        for(Case cs : cases)
        {
            if(cs.AccountId != null)
            {
                Account acc = new Account();
                    acc.Id = cs.AccountId;
                    acc.Latest_Case_No__c = cs.CaseNumber;
                    
                    acclist.add(acc);
            }
        }
        if(!acclist.isEmpty())
        {
            update acclist;
        }
    }
}