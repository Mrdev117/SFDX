Global class UpdateLeadsUsingBatch implements Database.Batchable<sobject>{
    global Database.QueryLocator Start(Database.BatchableContext bc){
        Date oneyearago = Date.today().addDays(-365);
        return Database.getQueryLocator([
            select Id, Status, LastModifiedDate from Lead where LastModifiedDate <: oneyearago and 
                                        Status != 'Converted' And Status != 'Archived'
        ]);
    }
    global void execute(Database.BatchableContext bc, List<sobject> lstobj)
    {
        list<Lead> lstlead = new List<Lead>();
        for(Lead led : (List<Lead>) lstobj)
        {
            led.Status = 'Archived';
            led.Industry = 'Agriculture';
            lstlead.add(led);
        }
        if(!lstlead.isEmpty())
        {
            update lstlead;
        }
    }
    global void finish(Database.BatchableContext bc)
    {
        system.debug('Lead updation is successfully done:' +  bc.getJobId());  
        
        AsyncApexJob jobInfo = [Select ID, Status, totalJobItems, jobItemsProcessed, numberOfErrors,
                               				CreatedBy.Email
                               						from AsyncApexJob
                               							Where Id =: bc.getJobId()];   

        // send email alert
        Messaging.SingleEmailMessage semail = new Messaging.SingleEmailMessage();
        list<string> toaddress = new list<string>{jobInfo.CreatedBy.Email, 'vijay.nalagarla66@gmail.com'};
            semail.setToAddresses(toaddress);
        
        list<string> ccaddress = new list<string>{'vijay.nalagarla430@gmail.com'};
            semail.setCcAddresses(ccaddress);

        list<string> Bccaddress = new list<string>{'vijay.nalagarla2000@gmail.com'};
            semail.setBccAddresses(Bccaddress);

            User curruser = [select Id, Name, Email from User where Id =: UserInfo.getUserId()];
            semail.setReplyTo(curruser.Email);

            semail.setSenderDisplayName(curruser.Name);
            string emailcontent = 'hello '+ curruser.Name +' your leads is updated successfully';
            semail.setHtmlBody(emailcontent);

            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {semail});
    }   
   
}