public with sharing class CustomLookupController {
    @AuraEnabled(cacheable = true)
    public static List<sObject> searchRecords(String objectApiName, String searchKey)
    {
        List<sObject> sObjectlist = new List<sObject>();
        if(String.isNotBlank(searchKey))
        {
            String key = '%' + searchKey + '%';
            String queryString = 'select Id, Name from ' + objectApiName + ' where Name Like : key';
            sObjectlist = Database.query(queryString, AccessLevel.USER_MODE);
        }
        return sObjectlist;
    }
}