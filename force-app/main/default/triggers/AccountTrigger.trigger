trigger AccountTrigger on Account (before Insert, after Insert) {
    if(Trigger.isInsert && Trigger.isBefore)
    {
        AccountTriggerHandler.updateRating(Trigger.new);
        AccountTriggerHandler.copingBillingtoShipping(Trigger.new);
    }
    if(Trigger.isAfter && Trigger.isInsert)
    {
        AccountTriggerHandler.CreateRelContact(Trigger.new);
    }
}