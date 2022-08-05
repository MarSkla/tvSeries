public with sharing class DataModifier {

    @AuraEnabled
    public static Boolean removeTvSeries(String seriesId){

        if(isAllowedIdType(seriesId, 'TV_Series__c')) {
            
            System.debug('removeTvSeries called with id: ' + seriesId);
            
            TV_Series__c recordToRemove = [SELECT ID FROM TV_Series__c WHERE Id =: seriesId];
    
            System.debug('recordToRemove = ' +  recordToRemove.Id);
    
            try{
                delete recordToRemove;
                System.debug('record deleted');
                return true;
            } catch (DmlException e) {
                System.debug('Deletion error');
                return false;
            }
        } else {
            System.debug('SomethingWRONG with removeTvSeries');
            return false;  
        } 
    }


    // @AuraEnabled
    // // public static TV_Series__c getTVSeriesToEdit(String outSeriesToEditId){
    // public static Boolean getTVSeriesToEdit(String outSeriesToEditId){

    //     System.debug('getTVSeriesToEdit called with id: ' + outSeriesToEditId);

    //     if(isAllowedIdType(outSeriesToEditId, 'TV_Series__c')) {

    //         // TV_Series__c recordToEdit = [SELECT ID FROM TV_Series__c WHERE Id =: outSeriesToEditId];
    
    //         System.debug('passed validation in getTVSeriesToEdit');

    //         // return recordToEdit;
    //         return true;

    //     } else {
    //         return null;
    //     }

    // }

    // @AuraEnabled
    // public static void updateSeries(String Id){
    //     try {
            
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }
    
    @TestVisible
    private static Boolean isAllowedIdType( String inputId, String objectType )
    {
        if ( !String.isBlank( inputId ) && inputId instanceof Id )
        {
            Id verifyId = Id.valueOf( inputId );
            if ( objectType.equalsIgnoreCase( verifyId.getSobjectType( ).getDescribe( ).getName( ) ) )
            {
                return true;
            }
        }
        return false;
    }
}