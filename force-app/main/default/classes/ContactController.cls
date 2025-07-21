public with sharing class ContactController {
    @AuraEnabled(cacheable = true)
    public static list<Contact> getcontactlist(){
        try {
            return [select Id, Name, FirstName, LastName, Phone, Title, PhotoUrl,Email from Contact 
                            where PhotoUrl != null with USER_MODE limit 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}