trigger TvSeriesTrigger on TV_Series__c (after insert) {

    if(Trigger.isAfter){
        if(Trigger.isInsert){

            // String triggerNewToJson = JSON.serialize(Trigger.new);            
            // TvSeriesTriggersHandler.sendNotification(triggerNewToJson);
        }
    }

}