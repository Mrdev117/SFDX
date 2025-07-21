trigger countAmount on Opportunity (after insert, after update, after delete, after undelete) {
    set<Id> oppids = new set<Id>();
    if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUndelete)){
        for(Opportunity opp : Trigger.new)
        {
            oppids.add(opp.AccountId);
        }
    }
   else if(Trigger.isAfter && Trigger.isUpdate){
        for(Opportunity opp : Trigger.new)
        {
            if(opp.AccountId != Trigger.oldMap.get(opp.Id).AccountId){
                oppids.add(Trigger.oldMap.get(opp.Id).AccountId);
            }
            else if(opp.AccountId != null)
            {
                oppids.add(opp.AccountId);
            }
        }
    }
   else if(Trigger.isAfter && Trigger.isDelete)
   {
        for(Opportunity opp : Trigger.old){
            if(opp.AccountId != null){
                oppids.add(opp.AccountId);
            }
        }
   }

   if(!oppids.isEmpty())
   {
        list<AggregateResult > agglist = [select AccountId ids, sum(Amount) totalamount from Opportunity where AccountId IN : oppids Group By AccountId];
        list<Account> acclist = new list<Account>();
        for(AggregateResult agg : agglist)
        {
            Account acc = new Account();
                acc.Id = (Id)agg.get('ids');
                acc.Total_opportunties__c = (Decimal)agg.get('totalamount');
                acclist.add(acc);
        }  
        if(!acclist.isEmpty())
        {
            update acclist;
        } 
   }
}