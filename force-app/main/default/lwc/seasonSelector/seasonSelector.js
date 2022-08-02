import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSeries from '@salesforce/apex/DataCollector.getSeries';
// import getSeasons from '@salesforce/apex/DataCollector.getSeasons';
import getEpisodes from '@salesforce/apex/DataCollector.getEpisodes';

export default class LightningExampleAccordionBasic extends LightningElement {

    @track Series;
    @track seasonsForSelectedSeries;

    
    _seriesCollapsed = false;
    _toastTitle;
    _toastMessage;

    constructor(){
        super();
        // this.isLoading = true;
        getSeries()
        .then(result => {
            this.Series = result
        })
        .catch(error => {
            {this._toastTitle = 'Ups'};
            {this._toastMessage = 'There is no data for this app'};
            this.showToast();
        })
        this.isLoading = false; 
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