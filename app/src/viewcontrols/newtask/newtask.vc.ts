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
            this.context.SingleTask.taskObjectives.push(input);
            console.log(this.context.SingleTask.taskObjectives);
            jQuery('.created-checkpoint-container').append("<p class='created-checkpoint'>" + input + "</p>")
            jQuery('#checkpoint-input').val("");
        }
        
        
    }
}

register.viewControl('newtask-vc', NewtaskViewControl, [FirebaseRepository]);
