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
    public static list<Account> getAccData(String inputIndustry){
        try {
            return [select Id, Name, Industry, Rating from Account
            where Industry = : inputIndustry WITH USER_MODE];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String updateaccount(String recordId, String newTicker)
    {
        Account acc = new Account(Id = recordId, TickerSymbol = newTicker);
        try {
            update acc;
            return 'Success';
        } catch (Exception ex) {
            return ex.getMessage();
        }
    }

    @AuraEnabled(cacheable = true)
    public static String getProfiles()
    {
        return [select Id, Profile.Name from User where Id = : UserInfo.getUserId()].Profile.Name;

    }

    @AuraEnabled
    public static list<Contact> getCons(Id acId){
        try {
            return [select ID, FirstName, LastName, Phone, Email from Contact where AccountId =: acId
            ORDER BY CreatedDate ASC Limit 1];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}