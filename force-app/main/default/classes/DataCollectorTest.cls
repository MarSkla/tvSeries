@isTest
public with sharing class DataCollectorTest {

    /**
    * @date 04.08.2022
    * @Description positive case test method for DataCollector.getSeriesAndSeasons() responsible
        for delivery data to constructor for seasonSelector LWC
    */

    @isTest static void getSeriesAndSeasonsTest(){

        for (Integer i = 0; i < 3; i++) {
            TV_Series__c testSeriesRecord = new TV_Series__c(
                Name = 'TestSeries' + i,
                Age_rating__c = '13+',
                Series_Trailer__c = 'http://'
            );
            insert testSeriesRecord;

            for (Integer j = 0; j < 2; j++) {
                TV_Series_Season__c testSeasonRecord = new TV_Series_Season__c(
                    Name = 'TestSeason' + j,
                    TVSeries__c = testSeriesRecord.Id
                );
                insert testSeasonRecord;
            }
        }


        Test.startTest();
        List<TV_Series__c> returned = DataCollector.getSeriesAndSeasons();
        System.assertEquals(3, returned.size());
        Test.stopTest();
    }

    /**
    * @date 04.08.2022
    * @Description null return case  test method for DataCollector.getSeriesAndSeasons() responsible
        for delivery data to constructor for seasonSelector LWC
    */

    @isTest static void getSeriesAndSeasonsNullReturnTest(){

        Test.startTest();
        System.assertEquals(null, DataCollector.getSeriesAndSeasons());     
        Test.stopTest();   
    }

    /**
    * @date 04.08.2022
    * @Description positive case  test method for DataCollector.getEpisodesTest() responsible
        for delivery data to connectedCallback() method of episodeListDisplay LWC
    */

    @istest static void getEpisodesTest() {

        List<TV_Series_Episode__c> testEpisodeRecords = new List<TV_Series_Episode__c>();

        TV_Series__c testSeriesRecord = new TV_Series__c(
            Name = 'TestSeries',
            Age_rating__c = '13+',
            Series_Trailer__c = 'http://'
        );

        insert testSeriesRecord;

        TV_Series_Season__c testSeasonRecord = new TV_Series_Season__c(
            Name = 'TestSeason',
            TVSeries__c = testSeriesRecord.Id
        );

        insert testSeasonRecord;

        for (Integer i = 0; i < 5; i++) {
            TV_Series_Episode__c testEpisode = new TV_Series_Episode__c(
                Name = 'TestEpisode' + i,
                TV_Series__c = testSeriesRecord.Id,
                TV_Series_Season__c = testSeasonRecord.Id

            );

            testEpisodeRecords.add(testEpisode);   
        }

        insert testEpisodeRecords;

        Test.startTest();
        List<TV_Series_Episode__c> returned = DataCollector.getEpisodes(testSeasonRecord.Id);
        System.assertEquals(5, returned.size());
        Test.stopTest();
        
    }

    /**
    * @date 04.08.2022
    * @Description null return case  test method for DataCollector.getEpisodesTest() responsible
        for delivery data to connectedCallback() method of episodeListDisplay LWC
    */

    @istest static void getEpisodesNullReturnTest() {

        TV_Series__c testSeriesRecord = new TV_Series__c(
            Name = 'TestSeries',
            Age_rating__c = '13+',
            Series_Trailer__c = 'http://'
        );

        insert testSeriesRecord;

        TV_Series_Season__c testSeasonRecord = new TV_Series_Season__c(
            Name = 'TestSeason',
            TVSeries__c = testSeriesRecord.Id
        );

        insert testSeasonRecord;

        Test.startTest();
        System.assertEquals(null, DataCollector.getEpisodes(testSeasonRecord.Id));     
        System.assertEquals(null, DataCollector.getEpisodes('11111'));     
        Test.stopTest();  
    }

    /**
    * @date 04.08.2022
    * @Description negative case test method for DataMOdifier.isAllowedIdType(String inputId, String objectType) validator
            of paramter type
    */

    @isTest static void isAllowedIdTypeFaslseReturnTest(){

        Test.startTest();
        System.assertEquals(false, DataCollector.isAllowedIdType('1111', 'TV_Series_Season__c'));
        Test.stopTest();
    }
}
