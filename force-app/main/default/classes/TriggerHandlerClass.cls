public with sharing class TriggerHandlerClass {
    public static void preventduplicationofCon(list<Contact> cotactslist)
    {
        Map<string, string> conMap = new Map<string, string>();
        for(Contact con : cotactslist)
        {
            if(con.Name != null || con.Email != null)
            {
                conMap.put(con.Name, con.Email);
            }
        }
        if(!conMap.isEmpty())
        {
            for(Contact con : cotactslist)
            {
                if(conMap.containsKey(con.Name) || conMap.containsKey(con.Email))
                {
                    con.addError('Duplicate records are found');
                }
            }
        }
    }
}