public with sharing class TvSeriesTriggersHandler {

    @future
    public static void sendNotification(String triggerObjects) {

        System.debug('inside sendNotification');

        List<TV_Series__c> addedSeries = (List<TV_Series__c>)JSON.deserialize(triggerObjects, List<TV_Series__c>.class);

        String mailContent = date.today().format() + ' TV Series added: \n';
        

        for (Integer i=0; i < addedSeries.size(); i++) {
            // mailContent += (i+1) + '. ' + '"' + addedSeries[i] + '"' + ' by ' + addedSeries[i].CreatedById + '\n';
            
            TV_Series__c single = addedSeries[i];
            mailContent += (i+1) + '. ' + single.Name + ' || Age category: ' + single.Age_rating__c
                        + ' || No. of seasons: ' + single.No_of_seasons__c + ' || No. of episodes: ' + single.No_of_episodes__c + '\n';
            
        }

        System.debug('mailContent: ' + mailContent);

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