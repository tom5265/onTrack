import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';
import NewTaskViewControl from '../../viewcontrols/newtask/newtask.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';

export default class HomeViewControl extends BaseViewControl {

    templateString: string = require('./home.vc.html');

    context: any = {
        allPosts: [],
        currentTasks: null,
        userSpecificId: ''
    };

    constructor(private firebaserepo: FirebaseRepository) {
        super();
    }


    navigatedTo(parameters: { id: string; }) {
        let tempArray:any = [];
        this.context.userSpecificId = parameters.id;
        let myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/users/' + this.context.userSpecificId);
        myDataRefPosts.on("value", (snapshot: any, prevChildKey: any) => {
            let data = snapshot.val();
            for (let key in data) {
                console.log(data);
                let task = {
                    postkey: key,
                    taskname: data[key].task.taskName,
                    taskobjectives: data[key].task.taskObjectives
                }
            tempArray.push(task);
                
            }
            this.context.allPosts = tempArray;
        });

    };


    addNewTask() {
        // this.navigator.navigate(NewTaskViewControl, {
        //     parameters: {
        //         id: this.context.userSpecificId
        //     }

        // });
        console.log(this.context.allPosts)

    }



}

register.viewControl('home-vc', HomeViewControl, [FirebaseRepository]);