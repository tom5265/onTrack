import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';
import HomeViewControl from '../../viewcontrols/home/home.vc';
import * as jQuery from 'jquery';

export default class NewtaskViewControl extends BaseViewControl {
    templateString: string = require('./newtask.vc.html');
    constructor(private firebaserepo: FirebaseRepository) {
        super();
    }


    context: any = {
        checkpointEdits: [],
        checkpointInput: "",
        UID: '',
        SingleTask: {
            taskName: "",
            taskObjectives: []
        }
    };

    postTask() {
        console.log(this.context.SingleTask.taskName);
        this.firebaserepo.postUserTask(this.context.SingleTask);
        this.navigator.navigate(HomeViewControl, {
            parameters: {
                id: this.context.UID
            }
        })
    }

    navigatedTo(parameters: { id: string; }) {
        console.log(parameters.id);
        this.context.userId = parameters.id;
        this.context.UID = parameters.id;
    }

    addCheckpoint() {    
        let input = this.context.checkpointInput;
        if(this.context.checkpointInput === ""){
            alert('No Checkpoint Entered!');
        }else{
            //deletes 'empty' paragraph if it's there
            if(jQuery('#empty-paragraph').length !== 0){
                jQuery('#empty-paragraph').remove();
                jQuery('#edit-checkpoints').show();
            }
            this.context.SingleTask.taskObjectives.push(input);
            console.log(this.context.SingleTask.taskObjectives);
            
            //sets added checkpoint to be of correct iscontenteditable state
            let elements = document.getElementsByClassName('created-checkpoint-cell');
            let checkpoints: Array<HTMLDivElement> = [];
            var ableToEdit: boolean
            for (let i = 0; i < elements.length; i++) {
                checkpoints.push(<HTMLDivElement>elements[i]);
            }
            if(!this.utils.isUndefined(checkpoints[0])){
                ableToEdit = checkpoints[0].isContentEditable;
            }
            //appends checkpoint to DOM
            jQuery('#created-checkpoint-container').append("<div class='created-checkpoint-cell' contenteditable='" + ableToEdit + "'><p contenteditable='inherit' class='created-checkpoint'>" + input + "</p></div>")
            jQuery('#checkpoint-input').val("");
        }
    }
    
    editCheckpoints(){
        //Save the edits and push them in the array
        if(jQuery('#edit-checkpoints').text() === 'SAVE'){
            console.log('saving!');
            this.context.SingleTask.taskObjectives = [];
            let editedCheckpoints = jQuery('.created-checkpoint');
            for(let i = 0; i < editedCheckpoints.length; i++){
                this.context.SingleTask.taskObjectives.push(editedCheckpoints[i].textContent);
                console.log(this.context.SingleTask.taskObjectives);
            }
        }
        let elements = document.getElementsByClassName('created-checkpoint-cell');
        let checkpoints: Array<HTMLDivElement> = [];
        for (let i = 0; i < elements.length; i++) {
            checkpoints.push(<HTMLDivElement>elements[i]);
        }
        
        let editButton = document.getElementById('edit-checkpoints');
        for(let i = 0; i < checkpoints.length; i++){
            if(checkpoints[i].isContentEditable){
                editButton.innerHTML = "EDIT";
                checkpoints[i].contentEditable = "false";
                jQuery(editButton).removeClass('save');
                jQuery(checkpoints[i]).css('border', 'none')
                
            }else{
                console.log('now its editable');
                checkpoints[i].contentEditable = "true";
                editButton.innerHTML = "SAVE";
                jQuery(editButton).addClass('save');
                jQuery(checkpoints[i]).css('border', '1px dashed white');
            }
        }
    }
}

register.viewControl('newtask-vc', NewtaskViewControl, [FirebaseRepository]);
