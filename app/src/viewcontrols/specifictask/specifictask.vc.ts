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

    publickey = '';

    constructor(private firebaserepo: FirebaseRepository) {
        super();
    }

    navigatedTo(parameters: { key: string; }) {
        let tempArray: any = null;
        let key = parameters.key;
        this.publickey = key;
        let myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/users/' + this.firebaserepo.userID + '/' + key);
        myDataRefPosts.on("value", (snapshot: any, prevChildKey: any) => {
            let data = snapshot.val();
            let task = {
                // postkey: key,
                taskName: data.task.taskName,
                taskObjectives: data.task.taskObjectives
            }
            this.context.specificTask = task;
            this.context.checkpoints = task.taskObjectives.length;
            let numberCompleted = 0;
            task.taskObjectives.forEach((obj: any) => {
                if (obj.isCompleted) {
                    numberCompleted++;
                }
            });
            // console.log(numberCompleted);
            this.context.completedCheckpoints = numberCompleted;

            if (numberCompleted > 0) {
                // console.log('o');
                if (task.taskObjectives.length === numberCompleted) {
                    let bg = document.getElementById('color-bg');
                    bg.style.backgroundColor = "rgba(201,278,114,0.1)";
                } else {
                    let bg = document.getElementById('color-bg')
                    bg.style.backgroundColor = 'rgba(250,255,255,0.2)';
                }
            }
        });
    };

    someFunc() {
        let numberOfTrues = document.getElementsByClassName('true');
        this.context.completedCheckpoints = numberOfTrues.length;
        let numberOfTasks = document.getElementsByClassName('task');
        this.context.checkpoints = numberOfTasks.length;
        // console.log(this.context.specificTask.postkey);
        // console.log(this.context.specificTask);
        if (numberOfTrues.length > 0) {
            if (numberOfTrues == numberOfTasks) {
                console.log('congrats');
            } 
        }
        this.firebaserepo.updateUserTask(this.context.specificTask, this.publickey);
    }
};



register.viewControl('specifictask-vc', SpecifictaskViewControl, [FirebaseRepository]);
