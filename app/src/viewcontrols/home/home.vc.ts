import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';
import NewTaskViewControl from '../../viewcontrols/newtask/newtask.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';
import SpecificTaskViewControl from '../../viewcontrols/specifictask/specifictask.vc';

export default class HomeViewControl extends BaseViewControl {

    templateString: string = require('./home.vc.html');

    context: any = {
        allPosts: [],
        currentTasks: null,
        userSpecificId: '',
    };

    constructor(private firebaserepo: FirebaseRepository) {
        super();
    }


    navigatedTo(parameters: { id: string; }) {
        let tempArray:any = [];
        this.context.userSpecificId = this.firebaserepo.userID;
        let myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/users/' + this.context.userSpecificId);
        myDataRefPosts.on("value", (snapshot: any, prevChildKey: any) => {
            let data = snapshot.val();
            for (let key in data) {
                let task = {
                    postkey: key,
                    taskname: data[key].task.taskName,
                    taskobjectives: data[key].task.taskObjectives,
                    taskobjectiveslength: data[key].task.taskObjectives.length,
                    uid: this.firebaserepo.userID
                }
                // console.log(task);
            tempArray.push(task);
                
            }
            this.context.allPosts = tempArray;
        });

    };
    
    navToSpecificPost(key:string){
        let postkey = key;
        let usersID = this.firebaserepo.userID;
        this.navigator.navigate(SpecificTaskViewControl, {
            parameters: {
                key: postkey,
                id: usersID
            }
        })
    }


    addNewTask() {
        this.navigator.navigate(NewTaskViewControl, {
            parameters: {
                id: this.context.userSpecificId
            }
        });
    }



}

register.viewControl('home-vc', HomeViewControl, [FirebaseRepository]);