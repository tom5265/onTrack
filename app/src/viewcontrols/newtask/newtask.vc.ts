import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';

export default class NewtaskViewControl extends BaseViewControl {
    templateString: string = require('./newtask.vc.html');
    constructor(private firebaserepo: FirebaseRepository){
        super();
    }

    context: any = {
        taskName: ""
    };
    
    postTask(){
        this.firebaserepo.postUserTask(this.context.taskName);
    }
}

register.viewControl('newtask-vc', NewtaskViewControl, [FirebaseRepository]);
