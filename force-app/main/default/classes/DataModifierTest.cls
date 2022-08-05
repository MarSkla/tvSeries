@isTest
public with sharing class DataModifierTest {

    /**
    * @date 04.08.2022
    * @Description positive case test method for DataMOdifier.removeTvSeries(String seriesId) expecting positive result
    */

    @isTest static void removeTvSeriesTest(){

        TV_Series__c testSeriesRecord = new TV_Series__c(
            Name = 'TestSeries',
            Age_rating__c = '13+',
            Series_Trailer__c = 'http://'
        );

        insert testSeriesRecord;

        Test.startTest();
        System.assertEquals(true, DataModifier.removeTvSeries(testSeriesRecord.Id));
        System.assertEquals(0, [SELECT Id FROM TV_Series__c].size());
        Test.stopTest();
    }


    /**
    * @date 04.08.2022
    * @Description positive case test method for DataMOdifier.removeTvSeries(String seriesId) in
             case of invalid paramter type passed to method
    */

    @isTest static void removeTvSeriesWrongParameterTest(){

        Test.startTest();
        System.assertEquals(false, DataModifier.removeTvSeries('11111'));
        Test.stopTest();

    }

    /**
    * @date 04.08.2022
    * @Description negative case test method for DataMOdifier.isAllowedIdType(String inputId, String objectType) validator
            of paramter type
    */

    @isTest static void isAllowedIdTypeFaslseReturnTest(){

        Test.startTest();
        System.assertEquals(false, DataModifier.isAllowedIdType('1111', 'TV_Series_Season__c'));
        Test.stopTest();
    }

}
