public with sharing class OpportunityTriggerHandler {
    public static void updateDescription(List<Opportunity> opportunitys)
    {
        for(Opportunity opp : opportunitys)
        {
            if(opp.Amount != null && opp.Amount >= 100000 && opp.Amount <= 500000)
            {
                opp.Description = 'Hot Opportunity';
            }
        }
    }
}