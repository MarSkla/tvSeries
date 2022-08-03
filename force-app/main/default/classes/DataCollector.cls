public with sharing class DataCollector {

    /**
    * @date 02.08.2022
    * @Description Public method used to get list of all TV Series with related seasons
    * @return a list of all records stored in "TV_Series__c" and "TV_Series_Seasons__c" objects
    * @return "TV_Series__c" fields returned (api names): Id, Name, No_of_seasons__c, No_of_episodes__c, Age_rating__c, TV_Series_Story__c, TVSeries_Logo__c
    * @return "TV_Series_Seasons__c" fields returned (api names): Id, Name
    */

    @AuraEnabled
    public static List<TV_Series__c> getSeriesAndSeasons(){
        
        List<TV_Series__c> ownerRecords = [SELECT Id, Name, No_of_seasons__c, No_of_episodes__c,
                                             Age_rating__c, TV_Series_Story__c, TVSeries_Logo__c,
                                             (SELECT Id, Name FROM TV_Series_Seasons__r ORDER BY Name)
                                             FROM TV_Series__c
                                             ORDER BY Name];

        if(ownerRecords.Size() > 0) {
            return ownerRecords;  
          } 
          else {
              return null;
          }
    }


    /**
    * @date 02.08.2022
    * @Description Public method used to get list of all episodes of the selected season of the selected TV Series stored in database
    * @param outSeason (String type) Id value for selected season of earlier selected series
    * @return a list of child records related to selected season stored in "TV_Series_Episode__c" sObject
    * @return field included (api names): Id, Name, Episode_Story__c
    */

    @AuraEnabled
    public static List<TV_Series_Episode__c> getEpisodes(String outSeason){

        // System.debug('getEpisodes called');
        // System.debug('outSeason: ' + outSeason);

        if(isAllowedIdType(outSeason, 'TV_Series_Season__c')) {
            // System.debug('isAllowedIdType: '+ isAllowedIdType(outSeason, 'TV_Series_Season__c'));
            List<TV_Series_Episode__c> episodes = [SELECT Id, Name, Episode_Story__c, Episode_info__c
                                FROM TV_Series_Episode__c
                                WHERE TV_Series_Season__c =: outSeason];

            // System.debug('episodes.size(): '+ episodes.size());

            if(episodes.Size() > 0 && episodes.size() <=100) {
                // System.debug('episodes.size() > 0 TRUE');
                // System.debug('episodes includes: ' + episodes);
                return episodes;  
            } if(episodes > 100) {
                
            }
            else {
                // System.debug('episodes.size() > 0 FALSE');

                return null;
            }
        } else {
            return null;
        }
    }


    /**
    * @date 02.08.2022
    * @Description Private method used to validate presence and type of Id for each record in a list of records
    *        returned by parent method.
    * @param inputId field's api name contating Id value for an object
    * @param objectType object's api name
    * @return true or false
    */

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
