import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';
import HomeViewControl from '../../viewcontrols/home/home.vc';

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
        this.navigator.navigate(HomeViewControl);
    }
}

register.viewControl('newtask-vc', NewtaskViewControl, [FirebaseRepository]);
