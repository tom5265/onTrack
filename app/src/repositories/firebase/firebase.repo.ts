import {async, register, storage} from 'platypus';
import BaseRepository from '../base/base.repo';
import firebaseservice from '../../services/firebase/firebase.svc';
import * as jQuery from 'jquery';


export default class FirebaseRepository extends BaseRepository {
    
    constructor(private firebaservice: firebaseservice, private storage: storage.LocalStorage) {
        super();
        this.userID = this.storage.getItem('username');
    };
    
    public userID: string;
    
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
        return this.firebaservice.logInUser(email, password).then((success) => {
            console.log(success);
            this.storage.setItem('username', success.uid);
            this.userID = success.uid;
            return success;
        });
    }
    
    postUserTask(task:Object){
        console.log(task);
        this.firebaservice.postUserTask(task)
    }
    
    getUserTasks(userId:string){
        
    }
    
}

register.injectable('firebase-repo', FirebaseRepository, [firebaseservice, storage.LocalStorage]);
