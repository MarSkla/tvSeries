trigger TvSeriesChangeTrigger on TV_Series__ChangeEvent (after insert) {

    if(Trigger.isAfter){
        if(Trigger.isInsert){
            for(TV_Series__ChangeEvent series : Trigger.new) {
                EventBus.ChangeEventHeader header = series.ChangeEventHeader;
                System.debug('Received change event for ' + header.entityName + ' for the ' + header.changeType + ' operation.');
                System.debug('TV Series Title: ' + series.Name);

            }
        }
    }


}