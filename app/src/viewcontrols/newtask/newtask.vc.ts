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
        checkpointInput: "",
        UID: '',
        SingleTask: {
            // postkey: '',
            taskName: "",
            completionDate: "",
            taskObjectives: []
        }
    };

    postTask() {
        //checks if task name and checkpoints are empty
        if(this.context.SingleTask.taskName !== "" && this.context.SingleTask.taskObjectives.length !== 0){
            this.firebaserepo.postUserTask(this.context.SingleTask);
            this.navigator.navigate(HomeViewControl, {
            parameters: {
                id: this.context.UID
            }
        })   
        }else{
            alert('Required fields are empty!');
        }
    }

    navigatedTo(parameters: { id: string; }) {
        console.log(parameters.id);
        this.context.userId = parameters.id;
        this.context.UID = parameters.id;
    }

    addCheckpoint() {
        let input = this.context.checkpointInput;
        if (this.context.checkpointInput === "") { //if its empty
            alert('No Checkpoint Entered!');
        } else {
            //deletes 'empty' paragraph if it's there
            if (jQuery('#empty-paragraph').length !== 0) {
                jQuery('#empty-paragraph').hide();
                jQuery('#edit-checkpoints').show();
            }
            let temp = {
                objName: input,
                isCompleted: false
            }
            this.context.SingleTask.taskObjectives.push(temp);
            console.log(this.context.SingleTask.taskObjectives);

            //sets added checkpoint to be of correct iscontenteditable state
            let elements = document.getElementsByClassName('created-checkpoint-cell');
            let checkpoints: Array<HTMLDivElement> = [];
            var ableToEdit: boolean
            for (let i = 0; i < elements.length; i++) {
                checkpoints.push(<HTMLDivElement>elements[i]);
            }
            if (!this.utils.isUndefined(checkpoints[0])) {
                ableToEdit = checkpoints[0].isContentEditable;
            }
            //appends checkpoint to DOM
            jQuery('#created-checkpoint-container').append("<div class='created-checkpoint-cell' contenteditable='" + ableToEdit + "'><p contenteditable='inherit' class='created-checkpoint'>" + input + "</p><i class='fa fa-minus-circle' aria-hidden='true'></i></div>")
            jQuery('#checkpoint-input').val("");
        }
    }

    editCheckpoints() {
        let elements = document.getElementsByClassName('created-checkpoint-cell');
        let checkpoints: Array<HTMLDivElement> = [];
        for (let i = 0; i < elements.length; i++) {
            checkpoints.push(<HTMLDivElement>elements[i]);
        }
        let editButton = document.getElementById('edit-checkpoints');
        let removeIcon = document.getElementsByClassName('fa');
        
        
        if(jQuery('#edit-checkpoints').text() === 'EDIT'){
            console.log('now its editable');
            jQuery('#edit-checkpoints').text('SAVE');
            jQuery(editButton).addClass('save');
            for (let i = 0; i < checkpoints.length; i++) {
                checkpoints[i].contentEditable = "true";
                jQuery(checkpoints[i]).css('border', '1px dashed white');
            }
            jQuery(removeIcon).show();
            
            jQuery(removeIcon).on("click", function(e) {
                let icon = e.target; //gets icon element clicked
                let objective = jQuery(icon).siblings(); //gets the specific objective
                console.log('Im happening!');
                jQuery(objective).toggleClass('strike');
            })
            
        }
        //Save the edits and push them in the array
        else{
            jQuery('#edit-checkpoints').text('EDIT');
            jQuery(removeIcon).hide();
            jQuery(editButton).removeClass('save');
            for (let i = 0; i < checkpoints.length; i++) {
                checkpoints[i].contentEditable = "false";
                jQuery(checkpoints[i]).css('border', 'none');
            }
            console.log('saving!');
            this.context.SingleTask.taskObjectives = [];
            let editedCheckpoints = jQuery('.created-checkpoint');
            for (let i = 0; i < editedCheckpoints.length; i++) {
                if(editedCheckpoints[i].classList.length <= 1){ //if it doesnt have strike class
                    let temp = {
                        objName: editedCheckpoints[i].textContent,
                        isCompleted: false
                    }
                    this.context.SingleTask.taskObjectives.push(temp);
                }else{
                    let entireCheckpoint = jQuery(editedCheckpoints[i]).parent();
                    entireCheckpoint.remove();
                }
            }
            if(this.context.SingleTask.taskObjectives.length === 0){ //adds back empty p 
                jQuery('#empty-paragraph').show();
                jQuery('#edit-checkpoints').hide();
            }
        }
    }

}

register.viewControl('newtask-vc', NewtaskViewControl, [FirebaseRepository]);
