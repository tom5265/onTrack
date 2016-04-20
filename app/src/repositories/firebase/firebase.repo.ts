import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import firebaseservice from '../../services/firebase/firebase.svc';
import * as jQuery from 'jquery';


export default class FirebaseRepository extends BaseRepository {
    
    constructor(private firebaservice: firebaseservice) {
        super();
    };

    createUser(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.firebaservice.createUser(email, password).then((success: any) => {
                resolve(success);
            }, (err: any) => {
                console.log('something went wrong in the repo!');
                console.log(err);
                reject(err);
            });
        });
    }
    
    logInUser(email:string, password: string): async.IThenable<any> {
        console.log('working');
        return this.firebaservice.logInUser(email, password);
    }
    
    postUserTask(task:Object){
        console.log('repo says');
        this.firebaservice.postUserTask(task)
    }
    
    getUserTasks(userId:string){
        
    }
    
}

register.injectable('firebase-repo', FirebaseRepository, [firebaseservice]);
