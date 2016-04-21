import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';


export default class SpecifictaskViewControl extends BaseViewControl {
    templateString: string = require('./specifictask.vc.html');

    context: any = {
        specificTask: null,
        post: []
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



    // navigatedTo(parameters: { key: string, id: string }) {
    // console.log(parameters.key);
    // console.log(parameters.id);

    // }


};

register.viewControl('specifictask-vc', SpecifictaskViewControl, [FirebaseRepository]);
