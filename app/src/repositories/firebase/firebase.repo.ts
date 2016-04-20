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
    
    logInUser(email:string, password: string) {
        console.log('working');
        return new Promise((resolve, reject) => {
            this.firebaservice.logInUser(email, password).then((success: any) => {
                resolve(success);
            }, (err: any) => {
                reject(err);
            })
        })
    }
    
    postUserTask(taskName: string, userId:string){
        console.log('repo says' + userId)
        this.firebaservice.postUserTask(taskName, userId)
    }
    
}

register.injectable('firebase-repo', FirebaseRepository, [firebaseservice]);
