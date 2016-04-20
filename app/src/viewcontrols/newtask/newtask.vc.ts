import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';
import HomeViewControl from '../../viewcontrols/home/home.vc';
import * as jQuery from 'jquery';

export default class NewtaskViewControl extends BaseViewControl {
    templateString: string = require('./newtask.vc.html');
    constructor(private firebaserepo: FirebaseRepository){
        super();
    }

    context: any = {
        SingleTask: {
            taskName: "",
            taskObjectives: {}
        }
    };
    
    postTask(){
        console.log(this.context.SingleTask.taskName);
        this.firebaserepo.postUserTask(this.context.SingleTask);
        this.navigator.navigate(HomeViewControl);
    }
    
    navigatedTo(parameters: { id: string; }){
        console.log(parameters.id);
        this.context.userId = parameters.id;
    }
    
    addCheckpoint(){
        jQuery('.checkpoint-container').append('<input type="text" placeholder="Checkpoint">');
    }
}

register.viewControl('newtask-vc', NewtaskViewControl, [FirebaseRepository]);
