import { publish, MessageContext} from 'lightning/messageService';
import SEASON_SELECTION from '@salesforce/messageChannel/seasonSelection__c';

import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSeriesAndSeasons from '@salesforce/apex/DataCollector.getSeriesAndSeasons';
// import getSeasons from '@salesforce/apex/DataCollector.getSeasons';
// import getEpisodes from '@salesforce/apex/DataCollector.getEpisodes';

export default class LightningExampleAccordionBasic extends LightningElement {

    @track Series;
    @track seasonsForSelectedSeries;
    @wire(MessageContext)
    messageContext;

    
    _seriesCollapsed = false;
    _toastTitle;
    _toastMessage;

    constructor(){
        super();
        // this.isLoading = true;
        getSeriesAndSeasons()
        .then(result => {
            this.Series = result
        })
        .catch(error => {
            this._toastTitle = 'Ups';
            this._toastMessage = 'There is no data for this app';
            this.showToast();
        })
        this.isLoading = false; 
    }

    seasonSelect(event){
        console.log('seasonSelection event handler works')
        // const id = event.currentTarget.dataset.id;
        // console.log('Id obtained: ' + id)
        console.log('event.target.dataset.id: ' + event.target.dataset.id);
        const season = {recordId : event.target.dataset.id};
        // console.log('Id obtained: ' + season)

        publish(this.messageContext, SEASON_SELECTION, season);        
    }

    // above ok

    // askForSeasons(event) {
    //     console.log('handleToggleSection works')
    //     let id = event.currentTarget.dataset.id;
    //     console.log('id assigned: ', id);
    //     getSeasons({outSeries : id})
    //     .then(result => {
    //         this.seasonsForSelectedSeries = result;
    //     })
    //     .catch(error => {
    //         this._toastTitle = 'Series:';
    //         this._toastMessage = 'No seasons for this series available in database.';
    //         this.showToast();
    //     })
    // }
    
    // below ok

    showToast() {
        const event = new ShowToastEvent({
            title: this._toastTitle,
            message: this._toastMessage,
            variant: 'warning',
        });
        this.dispatchEvent(event);
    }
}