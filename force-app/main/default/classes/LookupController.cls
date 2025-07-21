public with sharing class LookupController {
    @AuraEnabled(cacheable = true)
    public static List<sObject> searchResult(String objectApiName, String serachvalue)
    {
        list<sObject> searchobj = new list<sObject>();
        if(string.isNotBlank(serachvalue))
        {
            String key = '%' + serachvalue + '%';
            String query = 'Select Id, Name from '+ objectApiName + ' where Name Like : key';
            searchobj = Database.query(query, AccessLevel.USER_MODE);
        }
        return searchobj;
    }
}