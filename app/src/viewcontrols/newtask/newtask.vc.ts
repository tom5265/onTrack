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
        taskName: "",
        checkpoints: []
    };
    
    postTask(){
        console.log(this.context.checkpoints);
        this.firebaserepo.postUserTask(this.context.taskName);
        this.navigator.navigate(HomeViewControl);
    }
    
    navigatedTo(parameters: { id: string; }){
        console.log(parameters.id);
        this.context.userId = parameters.id;
    }
    
    addCheckpoint(){
        
    }
}

register.viewControl('newtask-vc', NewtaskViewControl, [FirebaseRepository]);
