import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import firebaseservice from '../../services/firebase/firebase.svc';


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
    
    
}

register.injectable('firebase-repo', FirebaseRepository, [firebaseservice]);
