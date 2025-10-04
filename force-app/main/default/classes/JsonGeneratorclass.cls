public with sharing class JsonGeneratorclass {
    public JsonGeneratorclass() {}
    public void createJson(string name, string phone, string ind){
        system.JSONGenerator js = JSON.createGenerator(true);
        js.writeStartObject();
            try {
                Account acc = new Account();
                    acc.Name = name;
                    acc.Phone = phone;
                    acc.Industry = ind;

                    insert acc;

                    js.writeStringField('Status', 'success');
                    js.writeIdField('Id', acc.Id);
                    js.writeStringField('message', 'Account Created Successfully');
                    js.writeNumberField('Code', 201);
            } catch (Exception e) {
                    js.writeStringField('Status', 'Error');
                    js.writeStringField('message', e.getMessage());
                    js.writeNumberField('Code', 401);
            }
        js.writeEndObject();

        string Result = js.getAsString();
        system.debug('Result :' + Result);
    }
}