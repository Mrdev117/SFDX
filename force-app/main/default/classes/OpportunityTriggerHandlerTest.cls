@isTest
public with sharing class OpportunityTriggerHandlerTest {
    @isTest
    public static void updateDescriptionTest()
    {
        List<Opportunity> opplist = new List<Opportunity>();

        for(Integer i=1; i<=5; i++)
        {
            Opportunity opp = new Opportunity();
                opp.Name = 'Test'+i;
                opp.StageName = 'Prospecting';
                opp.CloseDate = system.today().addDays(10);
                opp.Amount = 250000;
                opplist.add(opp);
        }

        if(!opplist.isEmpty())
        {
            Test.startTest();
            insert opplist;
            Test.stopTest();
        }

        List<Opportunity> updatedopp = [select Id, Description from Opportunity where Id =: opplist[0].Id];

        system.assertEquals('Hot Opportunity', updatedopp[0].Description);
    }
}