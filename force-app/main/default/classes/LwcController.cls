public with sharing class LwcController {
    @AuraEnabled(cacheable = true)
    public static List<sObject> searchRecords(String objectApiName, String searchvalue)
    {
        list<sObject> sobjectlist = new list<sObject>();
        if(String.isNotBlank(searchvalue))
        {
            String key = '%' + searchvalue + '%';
            String getquery = 'Select Id, Name from '+ objectApiName + ' where Name Like : key';
            sobjectlist = Database.query(getquery, AccessLevel.USER_MODE);
        }
        return sobjectlist;
    }

    @AuraEnabled(cacheable = true)
    public static list<Account> getAccDetails()
    {
        return [select Id, Name, Industry from Account];
    }

    @AuraEnabled(cacheable = true)
    public static list<sObject> AccData(String keyword){
        
            list<sObject> sobjectlist = new list<sObject>();
            if(String.isNotBlank(keyword))
            {
                String key = '%' + keyword + '%';
                String query = 'select Id, Name, Industry, Type from Account where Name Like : key';
                sobjectlist = Database.query(query, AccessLevel.USER_MODE);
            }
            return sobjectlist;
    }

    @AuraEnabled(cacheable = true)
    public static list<Account> getParentAccounts(){
        return [select Id, Name, Industry from Account where AnnualRevenue != null WITH USER_MODE];
    }

    @AuraEnabled(cacheable = true)
    public static list<Account> getConDetails(){
        try {
            return [select Id, Name from Account WITH USER_MODE];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}