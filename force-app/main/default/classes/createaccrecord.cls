public with sharing class createaccrecord {
    public static void insertrecord()
    {
        Account acc = new Account();
            acc.Name = 'Test acc';
            acc.Phone = '9666696211';
            acc.Industry = 'Energy';
            acc.Active__c = 'yes';

            insert acc;
    }
}