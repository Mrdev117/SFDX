public with sharing class AccountContactController {
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String keyword) {
        return [
            SELECT Id, Name FROM Account
            WHERE Name LIKE :('%' + keyword + '%') LIMIT 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByAccountId(Id accountId) {
        return [
            SELECT Id, Name FROM Contact
            WHERE AccountId = :accountId LIMIT 10
        ];
    }
}