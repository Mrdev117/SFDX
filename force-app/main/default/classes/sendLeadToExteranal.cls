public with sharing class sendLeadToExteranal {
    public static void sendLead(){

        system.JSONGenerator js = JSON.createGenerator(true);

        js.writeStartObject();
            List<Lead> leadlist = [select Id, Name, Company, Status, Email, AnnualRevenue from Lead where Status = 'Working - Contacted'];

            try {
                for(Lead led : leadlist)
                {
                    js.writeStringField('Lead Name', led.Name);
                    js.writeStringField('Company', led.Company);
                    js.writeStringField('Status', led.Status);
                    js.writeStringField('Email', led.Email);
                    js.writeNumberField('Annual Revenue', led.AnnualRevenue);
                    js.writeIdField('Id', led.Id);
                    js.writeStringField('Status of this', 'Success');
                    js.writeNumberField('Code', 201);
                }
            } catch (Exception e) {
                js.writeStringField('Status of this', 'Faild');
                js.writeStringField('Message', e.getMessage());
                js.writeNumberField('Code', 401);
            }
        js.writeEndObject();

        string result = js.getAsString();
        system.debug('Result :' + result);
    }
}