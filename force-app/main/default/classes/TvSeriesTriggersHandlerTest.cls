
@isTest
public with sharing class TvSeriesTriggersHandlerTest {

    @isTest static void sendNotificationTest(){

        List<TV_Series__c> testSeries = new List<TV_Series__c>();

        for (Integer i = 0; i < 5; i++) {
            TV_Series__c testRecord = new TV_Series__c(
                Name = 'TestSeries' + i,
                Age_rating__c = '13+',
                Series_Trailer__c = 'http://'
            );
            testSeries.add(testRecord);            
        }

        for (Integer i = 0; i < 5; i++) {
            TV_Series__c otherTestRecord = new TV_Series__c(
                Name = 'CAT 7+ ' + i,
                Age_rating__c = '7+',
                Series_Trailer__c = 'http://'
            );
            testSeries.add(otherTestRecord);            
        }

        
        System.assertEquals(0, Limits.getEmailInvocations());
        System.debug('emails sent: ' + Limits.getEmailInvocations());
        
        Test.startTest();
        insert testSeries;
        // System.assertEquals(0, Limits.getEmailInvocations());
        System.assertEquals(1, Limits.getEmailInvocations()); //possible assert for synchronous method
        System.debug('emails sent: ' + Limits.getEmailInvocations());
        
        Test.stopTest();
    }

}
