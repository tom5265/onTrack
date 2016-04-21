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
<<<<<<< HEAD
        // this.navigator.navigate(NewTaskViewControl, {
        //     parameters: {
        //         id: this.context.userSpecificId
        //     }

        // });
        console.log(this.context.allPosts)

=======
        this.navigator.navigate(NewTaskViewControl, {
            parameters: {
                id: this.context.userSpecificId
            }
        });
>>>>>>> 1d5551d725a607d03f8609da9deb7a9a819da5f4
    }



}

register.viewControl('home-vc', HomeViewControl, [FirebaseRepository]);