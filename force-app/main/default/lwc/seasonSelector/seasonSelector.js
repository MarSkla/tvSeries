import { publish, MessageContext} from 'lightning/messageService';
import SEASON_SELECTION from '@salesforce/messageChannel/seasonSelection__c';

import { updateRecord } from 'lightning/uiRecordApi'; //to refresh record view

import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSeriesAndSeasons from '@salesforce/apex/DataCollector.getSeriesAndSeasons';
import removeTvSeries from '@salesforce/apex/DataModifier.removeTvSeries';
// import getTVSeriesToEdit from '@salesforce/apex/DataModifier.getTVSeriesToEdit';


export default class LightningExampleAccordionBasic extends LightningElement {

    @track Series;
    // @track seasonsForSelectedSeries;

// communication
    @wire(MessageContext)
    messageContext;
    
    // serialId;

    @api retrievedRecordToEdit;
    @api retrievedRecordToAddReview;
    @api seasonToAddEpisode;
// spiner
    @api isLoading = false;

// actions on records
    @api isDeleted = false;
    @api isMEditModalOpen = false;
    @api isAddEpisodeModalOpen = false;
    @api isReviewModalOpen = false;

    // @api recordId;

    @api recordToEditId;

// message modal
    @api isMessageMOdalOpen = false;
    @api modalMessage;
    
    // _seriesCollapsed = false;
// toast
    _toastTitle;
    _toastMessage;
    _tastvariant;

    constructor(){
        super();
        this.isLoading = true;
        getSeriesAndSeasons()
        .then(result => {
            this.Series = result
        })
        .catch(error => {
            this.modalMessage = 'There is no data for this app'
            this.isMessageMOdalOpen = true;
        })
        this.isLoading = false; 
    }

    seasonSelect(event){
        this.isLoading = true

        // console.log('seasonSelection event handler works')
        // const id = event.currentTarget.dataset.id;
        // console.log('Id obtained: ' + id)
        // console.log('event.target.dataset.id: ' + event.target.dataset.id);
        const season = {recordId : event.target.dataset.id}
        // console.log('Id obtained: ' + season)

        publish(this.messageContext, SEASON_SELECTION, season) 
        // this.isLoading = false

    }



    editRecord(event){
        this.isLoading=true;
        console.log('entered editRecord');
        console.log('this.isMEditModalOpen: ' + this.isMEditModalOpen);
        const recordToEditId = event.currentTarget.dataset.id;
        // this.retrievedRecordToEdit = event.currentTarget.dataset.id;
        console.log('editRecord ID obtained: ' + recordToEditId);
        this.retrievedRecordToEdit = recordToEditId;
        console.log('retrievedRecordToEdit: ' + this.retrievedRecordToEdit);
        this.isMEditModalOpen = true;
        this.isLoading=false;
        console.log('this.isMEditModalOpen: ' + this.isMEditModalOpen);
        this.isLoading=false;

        // getTVSeriesToEdit({outSeriesToEditId : recordToEditId})
        // .then(result => {
        //     this.retrievedRecordToEdit = result
        //     console.log('retrievedRecordToEdit = ' + this.retrievedRecordToEdit);
        //     if(this.retrievedRecordToEdit != null) {
        //         console.log('entered if inside .then editRecord');
        //         this.isMEditModalOpen = true
        //     }
            
        // })
        // this.recordId = event.currentTarget.dataset.id;
    } 

    addSeriesReview(event){
        this.isLoading=true;
        console.log('entered addSeriesReview');
        console.log('this.isReviewModalOpen: ' + this.isReviewModalOpen);
        const seriesId = event.currentTarget.dataset.id;
        // this.retrievedRecordToEdit = event.currentTarget.dataset.id;
        console.log('editRecord ID obtained: ' + seriesId);
        this.retrievedRecordToAddReview = seriesId;
        console.log('retrievedRecordToAddReview: ' + this.retrievedRecordToAddReview);
        this.isReviewModalOpen = true;
        this.isLoading=false;
        console.log('this.isReviewModalOpen: ' + this.isMEditModalOpen);
    }

    addEpisode(event){
        this.isLoading=true;
        const id = event.currentTarget.dataset.id
        console.log('passed show.id: ' + id);
        this.isAddEpisodeModalOpen = true;
        this.seasonToAddEpisode = id;
        console.log('seasonToAddEpisode' + this.seasonToAddEpisode);
        console.log(('in Series variable: ' + this.Series));
        this.isLoading=false;
    }

    handleCancelinEditModal(event){
        this.isLoading=true;
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
        this.closeEditModal();
        this.isLoading=false;
        this.modalMessage = 'Action cancelled'
        this.isMessageMOdalOpen = true;
     }


    closeEditModal(event){
        this.isLoading=true;
        this.isMEditModalOpen = false;       
        // this._tastvariant='warning'
        // this.showToast()
        this.isLoading=false;
        this.modalMessage = 'TV Series fields updated'
        this.isMessageMOdalOpen = true;
    }

    handleCancelinAddReviewModal(event){
        this.isLoading=true;
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
        this.closeAddReviewModal();
        this.isLoading=false;
        this.modalMessage = 'Action cancelled'
        this.isMessageMOdalOpen = true;
     }


    closeAddReviewModal(event){
        this.isLoading=true;
        this.isReviewModalOpen = false;
        this.isLoading=false;
        this.modalMessage = 'TV Series review field updated'
        this.isMessageMOdalOpen = true;
    }

    deleteRecord(event){
        this.isLoading=true
        console.log('deleteRecord works');
        const id = event.currentTarget.dataset.id;
        console.log('Id obtained: ' + id)
        removeTvSeries({seriesId : id})
        this._toastTitle='Success'
        console.log('this._toastTitle: ' + this._toastTitle);
        this._toastMessage='Record Deleted'
        console.log('this._toastMessage: ' + this._toastMessage);
        this._tastvariant='success'
        console.log('this._tastvariant: ' + this._tastvariant);
        this.showToast(); //NOT WORKING
        // .then(result => {
        //     if(result=true){
        //         this._toastTitle='Success'
        //         this._toastMessage='Record Deleted'
        //         this._tastvariant='success'
        //         this.showToast()
        //     } else {
        //         this._toastTitle='Failure'
        //         this._toastMessage='Record Deleted'
        //         this._tastvariant='success'
        //         this.showToast()
        //     }
        // })
        // .then(result => {
        //     if(result = true){
        //         this.refresh();
        //     }
        // })
        this.isLoading=false
    }

    refresh(){
        // eval("$A.get('e.force:refreshView').fire();") to dla aury
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

    // showToast() {
    //     console.log('entered showToast');
    //     const event = new ShowToastEvent({
    //         title: this._toastTitle,
    //         message: this._toastMessage,
    //         variant: this._tastvariant,
    //     });
    //     this.dispatchEvent(event);
    // }


    closeMessageModal(){
        this.isMessageMOdalOpen = false;
    }

 
}