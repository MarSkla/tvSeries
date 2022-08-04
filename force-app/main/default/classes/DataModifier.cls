public with sharing class DataModifier {

    Public static void removeTVSeries(String seriesId){
        
        TV_Series__c recordToRemove = [SELECT ID FROM TV_Series__c WHERE Id =: seriesId];

        try{
            delete recordToRemove;
        } catch (DmlException e) {
            System.debug('Deletion error');
        }

    }
}