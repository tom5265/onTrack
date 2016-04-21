import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';


export default class SpecifictaskViewControl extends BaseViewControl {
    templateString: string = require('./specifictask.vc.html');

    context: any = {
        specificTask: '',
        post: []
    };
    
    constructor(private firebaserepo: FirebaseRepository) {
        super();
    }
    
    navigatedTo(parameters: { key: string; }) {
        let tempArray:any = [];
        this.context.specificTask = parameters.key;
        let myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/users/' + this.firebaserepo.userID + '/' + this.context.specificTask);
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
            this.context.post = tempArray;
        });

    };
}

register.viewControl('specifictask-vc', SpecifictaskViewControl, [FirebaseRepository]);
