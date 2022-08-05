import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext} from 'lightning/messageService';
import SEASON_SELECTION from '@salesforce/messageChannel/seasonSelection__c';

import { LightningElement, api, track, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getEpisodes from '@salesforce/apex/DataCollector.getEpisodes';


export default class EpisodeListDisplay extends LightningElement {
    @api recordId;
    subscription = null;
    @wire(MessageContext)
    messageContext;

    @api isLoding = false;

    episodes

    // myRecordId = 'a017Q00000wDEtBQAW'

    _toastTitle
    _toastMessage

    subscribeToMessageChannel() {
        this.isLoading=true;
        // console.log('this.subscription: '+ this.subscription);
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                SEASON_SELECTION,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
        this.isLoading=false;
    }

    unsubscribeToMessageChannel() {
        this.isLoading=true;
        unsubscribe(this.subscription);
        this.subscription = null;
        this.isLoading=false;
    }

    handleMessage(message) {
        this.isLoding=true;
        // console.log('message: ' + message.recordId);
        this.recordId = message.recordId;
        // console.log('subscription: recordId = ' + this.recordId);
        this.retrieveEpisodes();
        this.isLoding=false;

    }

    connectedCallback() {
        this.isLoding=true;

        // console.log('callback stat');
        this.subscribeToMessageChannel();
        // console.log('callback end');
        // console.log('this.recordId: ' + this.recordId);
        this.isLoding=false;

    }

    disconnectedCallback() {
        this.isLoading=true;
        this.unsubscribeToMessageChannel();
        this.isLoading=false;
    }

    retrieveEpisodes(){
        this.isLoding = true;

        // console.log('episodeId: ' + episodeId);
        // console.log('retrieveEpisodes - this.recordId = ' + this.recordId);

        // setTimeout(() => 

        getEpisodes({outSeason : this.recordId})
        .then(result => {
            this.episodes=result
            // console.log('episodes.size() = ', this.episodes.size())
            this.isLoding = false;
        })
        .catch(error => {
            {this._toastTitle = 'Ups'}
            {this._toastMessage = 'There are noe episodes for this season'};
            this.showToast();
            this.isLoding = false;

        })
        // , 1000);        
    }
    
    showToast() {
        this.isLoading=true;
        const event = new ShowToastEvent({
            title: this._toastTitle,
            message: this._toastMessage,
            variant: 'warning',
        });
        this.dispatchEvent(event);
        this.isLoading=false;
    }
}