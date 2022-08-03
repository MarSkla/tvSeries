import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext} from 'lightning/messageService';
import SEASON_SELECTION from '@salesforce/messageChannel/seasonSelection__c';

import { LightningElement, api, track, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getEpisodes from '@salesforce/apex/DataCollector.getEpisodes';
import getEpisodes2 from '@salesforce/apex/DataCollector.getEpisodes2';


export default class EpisodeListDisplay extends LightningElement {
    @api recordId;
    subscription = null;
    @wire(MessageContext)
    messageContext;

    episodes

    myRecordId = 'a017Q00000wDEtBQAW'

    _toastTitle
    _toastMessage

    subscribeToMessageChannel() {
        console.log('this.subscription: '+ this.subscription);
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                SEASON_SELECTION,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        console.log('message: ' + message.recordId);
        this.recordId = message.recordId;
        console.log('subscription: recordId = ' + this.recordId);
        this.retrieveEpisodes();
    }

    connectedCallback() {
        console.log('callback stat');
        this.subscribeToMessageChannel();
        console.log('callback end');
        console.log('this.recordId: ' + this.recordId);
    }

    // disconnectedCallback() {
    //     this.unsubscribeToMessageChannel();
    // }

    retrieveEpisodes(){
        // console.log('episodeId: ' + episodeId);
        console.log('retrieveEpisodes - this.recordId = ' + this.recordId);
        getEpisodes({outSeason : this.recordId})
        .then(result => {
            this.episodes=result
            console.log('episodes.size() = ', this.episodes.size())
        })
        .catch(error => {
            {this._toastTitle = 'Ups'}
            {this._toastMessage = 'There are noe episodes for this season'};
            this.showToast();
        })
    }

        

//TEMPORARY OFF Start
    // connectedCallback(){
    //     console.log('connectedCallback works')
    //     getEpisodes({outSeason : 'a017Q00000wDEtBQAW'})
    //     .then(result => {
    //         console.log('from .then')
    //         this.episodes=result
    //         console.log('episodes.size() = ', this.episodes.size())
    //     })
    //     .catch(error => {
    //         {this.toastTitle = 'Ups'}
    //         {this.toastMessage = 'There are noe episodes for this season'};
    //         this.showToast();
    //     })
    // }

    showToast() {
        const event = new ShowToastEvent({
            title: this._toastTitle,
            message: this._toastMessage,
            variant: 'warning',
        });
        this.dispatchEvent(event);
    }
//TEMPORARY OFF End


// TESTS methods & data

    // test() {
    //     console.log('test() works')
    //     // getEpisodes(this.myRecordId)
    //     this.episodes = getEpisodes2();
    //     console.log('episodes.size():', this.episodes.size())

    // }

// !!!!!!!!!!!!!! oldies
    

    // constructor(){
    //     console.log('constructor called')
    //     super();
    //     // this.isLoading = true;
    //     getEpisodes('a017Q00000wDEtBQAW')
    //     console.log('getEpisodes called')
    //     .then(result => {
    //         this.episodes = result
    //         console.log('episodes.size() = ' + this.episodes.size())
    //     })
    //     .catch(error => {
    //         {this.toastTitle = 'Ups'};
    //         {this.toastMessage = 'There are noe episodes for this season'};
    //         this.showToast();
    //     })
    //     // this.isLoading = false; 
    // }
}