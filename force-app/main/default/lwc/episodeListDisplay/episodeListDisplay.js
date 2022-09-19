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

    @api areEpisodesLoading = false;
    @api isMessageMOdalOpen = false;
    @api modalMessage;
    @api areEpisodesVisible = false;

    episodes

    // myRecordId = 'a017Q00000wDEtBQAW'

    _toastTitle
    _toastMessage


    connectedCallback() {
        // console.log('connectedCallback() enter areEpisodesLoading = ', this.areEpisodesLoading);
        // this.areEpisodesLoading=true;
        // console.log('connectedCallback() change areEpisodesLoading = ', this.areEpisodesLoading);


        // console.log('callback stat');
        this.subscribeToMessageChannel();
        // console.log('callback end');
        // console.log('this.recordId: ' + this.recordId);
        // this.areEpisodesLoading=false;

    }

    subscribeToMessageChannel() {
        // console.log('subscribeToMessageChannel() enter areEpisodesLoading = ', this.areEpisodesLoading);
        // this.areEpisodesLoading=true;
        // console.log('subscribeToMessageChannel() change areEpisodesLoading = ', this.areEpisodesLoading);
        
        // console.log('this.subscription: '+ this.subscription);
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                SEASON_SELECTION,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
        // this.areEpisodesLoading=false;
    }

    handleMessage(message) {
        // console.log('handleMessage() enter areEpisodesLoading = ', this.areEpisodesLoading);
        this.areEpisodesLoading=true;
        // console.log('handleMessage() change areEpisodesLoading = ', this.areEpisodesLoading);

        // console.log('message: ' + message.recordId);
        this.recordId = message.recordId;
        // console.log('subscription: recordId = ' + this.recordId);
        // this.areEpisodesLoading=false;
        this.retrieveEpisodes();

    }


    retrieveEpisodes(){
        // console.log('retrieveEpisodes() enter areEpisodesLoading = ', this.areEpisodesLoading);
        this.areEpisodesLoading = true;
        // console.log('retrieveEpisodes() change areEpisodesLoading = ', this.areEpisodesLoading);


        // console.log('episodeId: ' + episodeId);
        // console.log('retrieveEpisodes - this.recordId = ' + this.recordId);

        // setTimeout(() => 

        getEpisodes({outSeason : this.recordId})
        .then(result => {
            if(result != null){
                this.episodes=result
                // console.log('episodes.length = ', this.episodes.length)
                this.areEpisodesLoading = false;
                // console.log('areEpisodesLoading = ', this.areEpisodesLoading);

            } else {
                this.modalMessage = 'No episodes for this season'
                this.isMessageMOdalOpen = true;
                this.areEpisodesLoading = false;
            }
            // this.areEpisodesLoading = true;
            // console.log('result = ', result);
            // this.areEpisodesLoading = false;
        })
        // .catch(error => {            
            
        //     // {this._toastTitle = 'Ups'}
        //     // {this._toastMessage = 'There are noe episodes for this season'};
        //     // this.showToast();
        //     // this.areEpisodesLoading = false;
            
        // })
        // console.log('retrieveEpisodes() exit areEpisodesLoading = ', this.areEpisodesLoading);
        // this.areEpisodesLoading = false
        // console.log('retrieveEpisodes() exit change areEpisodesLoading = ', this.areEpisodesLoading);
        // console.log('retrieveEpisodes() end');

        // , 1000);        
    }

    unsubscribeToMessageChannel() {
        // console.log('unsubscribeToMessageChannel() enter areEpisodesLoading = ', this.areEpisodesLoading);
        this.areEpisodesLoading=true;
        // console.log('unsubscribeToMessageChannel() change areEpisodesLoading = ', this.areEpisodesLoading);


        unsubscribe(this.subscription);
        this.subscription = null;
        this.areEpisodesLoading=false;
    }


    closeMessageModal(){
        this.isMessageMOdalOpen = false;
    }

    handleEpisodesLoading() {
        this.areEpisodesVisible=true; 
        // console.log('handleDetailLoading() exit areEpisodesLoading = ', this.areEpisodesLoading);
        this.areEpisodesLoading = false
        // console.log('handleDetailLoading() exit change areEpisodesLoading = ', this.areEpisodesLoading);
     }



    // disconnectedCallback() {
    //     this.areEpisodesLoading=true;
    //     this.unsubscribeToMessageChannel();
    //     this.areEpisodesLoading=false;
    // }

    
    // showToast() {
    //     this.areEpisodesLoading=true;
    //     const event = new ShowToastEvent({
    //         title: this._toastTitle,
    //         message: this._toastMessage,
    //         variant: 'warning',
    //     });
    //     this.dispatchEvent(event);
    //     this.areEpisodesLoading=false;
    // }
}