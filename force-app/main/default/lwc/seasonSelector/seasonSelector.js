import { publish, MessageContext} from 'lightning/messageService';
import SEASON_SELECTION from '@salesforce/messageChannel/seasonSelection__c';

import { updateRecord } from 'lightning/uiRecordApi'; //to refresh record view

import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSeriesAndSeasons from '@salesforce/apex/DataCollector.getSeriesAndSeasons';
import removeTvSeries from '@salesforce/apex/DataModifier.removeTvSeries';
import getTVSeriesToEdit from '@salesforce/apex/DataModifier.getTVSeriesToEdit';


export default class LightningExampleAccordionBasic extends LightningElement {

    @track Series;
    @track seasonsForSelectedSeries;

// communication
    @wire(MessageContext)
    messageContext;
    
    // serialId;

    @api retrievedRecordToEdit;
// spiner
    @api isLoading = false;

// actions on records
    @api isDeleted = false;
    @api isMEditModalOpen = false;

    // @api recordId;

    @api recordToEditId;
    
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
            this._toastTitle = 'Ups';
            this._toastMessage = 'There is no data for this app';
            this.showToast();
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
        this.isLoading = false

    }

    editRecord(event){
        this.isLoading=true;
        console.log('entered editRecord');
        console.log('this.isMEditModalOpen: ' + this.isMEditModalOpen);
        const recordToEditId = event.currentTarget.dataset.id;
        // const recordToEditId = event.currentTarget.dataset.id;
        console.log('editRecord ID obtained: ' + recordToEditId);
        this.retrievedRecordToEdit = recordToEditId;
        console.log('retrievedRecordToEdit: ' + this.retrievedRecordToEdit);
        this.isMEditModalOpen = true;
        this.isLoading=false;
        console.log('this.isMEditModalOpen: ' + this.isMEditModalOpen);

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

    handleCancel(event){
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
        this.closeEditModal();
     }


    closeEditModal(event){
        this.isMEditModalOpen = false;
        this._tastvariant='warning'
        this.showToast()
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

    showToast() {
        console.log('entered showToast');
        const event = new ShowToastEvent({
            title: this._toastTitle,
            message: this._toastMessage,
            variant: this._tastvariant,
        });
        this.dispatchEvent(event);

        
        
    }
}