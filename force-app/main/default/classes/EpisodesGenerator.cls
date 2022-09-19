public with sharing class EpisodesGenerator {

    public static void generateSeriesData(String seriesName, String ageRating, Integer numEpisodes) {
        TV_Series__c newSeries = new TV_Series__c(
            Name = seriesName,
            Age_rating__c = ageRating
        );

        insert newSeries;

        TV_Series_Season__c newSeason = new TV_Series_Season__c(
            TVSeries__c = newSeries.Id,
            Name = seriesName + ' S1'
        );

        insert newSeason;

        List<TV_Series_Episode__c> episodes = new List<TV_Series_Episode__c>();
        
        for (Integer i = 1; i <= numEpisodes; i++) {
            TV_Series_Episode__c episode = new TV_Series_Episode__c(
                Name = seriesName + ' S1' + ' E' + i,
                TV_Series_Season__c = newSeason.Id,
                TV_Series__c = newSeries.Id
            );
            episodes.add(episode);
        }

        insert episodes;
    }

    public static void generateSeriesDataWithProperEpisodeNameFormat(Integer numEpisodes) {
        TV_Series__c newSeries = new TV_Series__c(
            Name = 'The Bald and the Beautiful',
            Age_rating__c = '7+'
        );

        insert newSeries;

        TV_Series_Season__c newSeason = new TV_Series_Season__c(
            TVSeries__c = newSeries.Id,
            Name = 'TB&TB S01'
        );

        insert newSeason;

        List<TV_Series_Episode__c> episodes = new List<TV_Series_Episode__c>();
        
        for (Integer i = 1; i <= numEpisodes; i++) {
            if (i<10){
                TV_Series_Episode__c episode = new TV_Series_Episode__c(
                    Name = 'E000' + i + ' S1' + ' TB&TB',
                    TV_Series_Season__c = newSeason.Id,
                    TV_Series__c = newSeries.Id
                );
                episodes.add(episode);

            } else if (i<100){
                TV_Series_Episode__c episode = new TV_Series_Episode__c(
                    Name = 'E00' + i + ' S1' + ' TB&TB',
                    TV_Series_Season__c = newSeason.Id,
                    TV_Series__c = newSeries.Id
                );
                episodes.add(episode);

            } else if (i<1000){
                TV_Series_Episode__c episode = new TV_Series_Episode__c(
                    Name = 'E0' + i + ' S1' + ' TB&TB',
                    TV_Series_Season__c = newSeason.Id,
                    TV_Series__c = newSeries.Id
                );
                episodes.add(episode);

            } else {
                TV_Series_Episode__c episode = new TV_Series_Episode__c(
                    Name = 'E' + i + ' S1' + ' TB&TB',
                    TV_Series_Season__c = newSeason.Id,
                    TV_Series__c = newSeries.Id
                );
                episodes.add(episode);

            }
        }

        insert episodes;
    }

}