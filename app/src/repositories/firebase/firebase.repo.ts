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
                console.log('success')
                console.log(success);
                resolve(success);
            }, (err: any) => {
                console.log('something went wrong!');
                console.log(err);
                reject(err);
            });
        });
    }
    
    logInUser(email:string, password: string) {
        console.log('poop');
        return new Promise((resolve, reject) => {
            this.firebaservice.logInUser(email, password).then((success: any) => {
                console.log('success');
                console.log(success);
                resolve(success);
            }, (err: any) => {
                reject(err);
            })
        })
    }
    
    postUserTask(taskName: string){
        this.firebaservice.postUserTask(taskName);
    }
    
}

register.injectable('firebase-repo', FirebaseRepository, [firebaseservice]);
