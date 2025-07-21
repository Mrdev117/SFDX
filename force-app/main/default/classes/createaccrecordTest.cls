@isTest
private class createaccrecordTest {
	
    @isTest
    private static void testinsert()
    {
        Account acc = new Account();
        	acc.Name = 'test acc';
        	acc.Phone = '547851252';
        	acc.Active__c = 'yes';
        	acc.Industry = 'energy';
        insert acc;
        
        list<Account> acclist = [select id, Name from Account where Id =: acc.Id];
        
        System.assertEquals(0, ApexPages.getMessages().size());
    }
}