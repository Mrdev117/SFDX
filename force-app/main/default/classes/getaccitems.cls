public with sharing class getaccitems {
   @AuraEnabled(cacheable = true)
   public static list<Account> getaccrec()
   {
        return [select Id, Name, Industry from Account];
   }
}