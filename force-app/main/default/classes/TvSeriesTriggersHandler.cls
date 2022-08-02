public with sharing class TvSeriesTriggersHandler {

    public static void sendNotification(String triggerObjects) {

        List<TV_Series__c> addedSeries = (List<TV_Series__c>)JSON.deserialize(triggerObjects, List<TV_Series__c>.class);

        String mailContent = 'TV Series added ' + Date.today() + ' : \n';

        for (Integer i=0; i < addedSeries.size(); i++) {
            mailContent += (i+1) + '. ' + '"' + addedSeries[i] + '"' + ' by ' + addedSeries[i].CreatedById + '\n';
        }

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {'marcin.skladanowski@accenture.com'};
        mail.setToAddresses(toAddresses);
        mail.setReplyTo('marcin.skladanowski@accenture.com');
        mail.setSubject('TV Series added today');
        mail.setPlainTextBody(mailContent);
        System.debug('mail created: ' + mail);
        
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});  
        System.debug('email sent (info from handler)');
        
    }

}
