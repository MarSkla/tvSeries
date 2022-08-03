import { LightningElement, api, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getEpisodes from '@salesforce/apex/DataCollector.getEpisodes';
import getEpisodes2 from '@salesforce/apex/DataCollector.getEpisodes2';


export default class EpisodeListDisplay extends LightningElement {
    // @api recordId;
    @api episodes
    myRecordId = 'a017Q00000wDEtBQAW'

    _toastTitle
    _toastMessage
    
    // test() {
    //     console.log('test() works')
    //     // getEpisodes(this.myRecordId)
    //     this.episodes = getEpisodes2();
    //     console.log('episodes.size():', this.episodes.size())

    // }
    

    connectedCallback(){
        console.log('connectedCallback works')
        getEpisodes({outSeason : 'a017Q00000wDEtBQAW'})
        console.log('passed getEpisodes(this.myRecordId) with id: ', this.myRecordId )
        .then(result => {
            this.episodes = result;
        })
        // .then(result => {
        //     console.log('from .then')
        //     this.episodes=result
        //     console.log('episodes.size() = ', this.episodes.size())
        // })
        .catch(error => {
            {this.toastTitle = 'Ups'}
            {this.toastMessage = 'There are noe episodes for this season'};
            this.showToast();
        })
    }
    

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

    showToast() {
        const event = new ShowToastEvent({
            title: this._toastTitle,
            message: this._toastMessage,
            variant: 'warning',
        });
        this.dispatchEvent(event);
    }
}
