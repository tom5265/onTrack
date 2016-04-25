import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';
import * as jQuery from 'jquery';

export default class SpecifictaskViewControl extends BaseViewControl {
    templateString: string = require('./specifictask.vc.html');

    context: any = {
        specificTask: null,
        post: [],
        checkpoints: 0,
        completedCheckpoints: 0
    };

    constructor(private firebaserepo: FirebaseRepository) {
        super();
    }

    navigatedTo(parameters: { key: string; }) {
        let tempArray: any = null;
        let key = parameters.key;
        let myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/users/' + this.firebaserepo.userID + '/' + key);
        myDataRefPosts.on("value", (snapshot: any, prevChildKey: any) => {
            let data = snapshot.val();
            let task = {
                postkey: key,
                taskname: data.task.taskName,
                taskobjectives: data.task.taskObjectives
            }
            console.log(task);
            this.context.specificTask = task;
        })
        
    };

    toggleComplete() {
        let taskTrue = jQuery(".task");
        console.log(this.context);
        jQuery(taskTrue).toggleClass('true');
            
    }
};


register.viewControl('specifictask-vc', SpecifictaskViewControl, [FirebaseRepository]);
