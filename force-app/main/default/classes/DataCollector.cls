public with sharing class DataCollector {

    /**
    * @date 02.08.2022
    * @Description Public method used to get list of all TV Series stored in database
    * @return a list of all records stored in "TV_Series__c" sObject
    * @return fields included (api names): Id, Name, No_of_seasons__c, No_of_episodes__c, Age_rating__c, TV_Series_Story__c, TVSeries_Logo__c
    */
    @AuraEnabled
    public static List<TV_Series__c> getSeries(){
        
        List<TV_Series__c> ownerRecords = [SELECT Id, Name, No_of_seasons__c, No_of_episodes__c, Age_rating__c, TV_Series_Story__c, TVSeries_Logo__c
                                            FROM TV_Series__c];

        if(ownerRecords.Size() > 0) {
            return ownerRecords;  
          } 
          else {
              return null;
          }
    }

    /**
    * @date 02.08.2022
    * @Description Public method used to get list of all seasons for TV Series Id passed as parameter
    * @param outSeries (String type) Id value of TV Series selected
    * @return a list of child records related to selected TV Series stored in "TV_Series_Season__c" sObject
    * @return fields included (api names): Id, Name, No_of_episodes__c
    */

    @AuraEnabled
    public static List<TV_Series_Season__c> getSeasons(String outSeries) {

        if(isAllowedIdType(outSeries, 'TV_Series__c')) {
            List<TV_Series_Season__c> seasons = [SELECT Id, Name, No_of_episodes__c
                                            FROM TV_Series_Season__c
                                            WHERE TVSeries__c =: outSeries]; 

            if(seasons.Size() > 0) {
                return seasons;  
            } else {
                return null;
            }
        } else {
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

        if(isAllowedIdType(outSeason, 'TV_Series_Season__c')) {
            List<TV_Series_Episode__c> episodes = [SELECT Id, Name, Episode_Story__c
                                FROM TV_Series_Episode__c
                                WHERE TV_Series_Season__c =: outSeason];

            if(episodes.Size() > 0) {
                return episodes;  
            } else {
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
