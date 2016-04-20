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
        userId: ""
    };
    
    postTask(){
        this.firebaserepo.postUserTask(this.context.taskName, this.context.userId);
        this.navigator.navigate(HomeViewControl);
    }
    
    navigatedTo(parameters: { id: string; }){
        console.log('nav to newtask');
        console.log(parameters.id);
        this.context.userId = parameters.id;
    }
}

register.viewControl('newtask-vc', NewtaskViewControl, [FirebaseRepository]);
