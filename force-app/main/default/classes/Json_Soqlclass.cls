public with sharing class Json_Soqlclass {
    public static void createjsonquery()
    {
        system.JSONGenerator js = JSON.createGenerator(true);

        js.writeStartObject();
            list<Account> acclist = [select Id, Name, Industry, Phone from Account where Phone != null];
            try {
                for(Account acc : acclist)
                {
                    js.writeStringField('Account Name', acc.Name);
                    js.writeStringField('Phone', acc.Phone);
                    js.writeStringField('Status', 'Success');
                    js.writeNumberField('Code', 201);
                }
            } catch (Exception e) {
                js.writeStringField('Status', 'Faild');
                js.writeNumberField('Code', 401);
                js.writeStringField('Message', e.getMessage());
            }
            
        js.writeEndObject();

        string result = js.getAsString();
        system.debug('Result :' + result);
    }
}