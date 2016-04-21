import {async, register, storage} from 'platypus';
import BaseService from '../base/base.svc';



export default class FirebaseService extends BaseService {

    private UID: string;
    private myDataRef = new Firebase('https://popping-inferno-1046.firebaseIO.com');
    private myDataRefPosts: Firebase;

    createUser(email: string, password: string): async.IThenable<any> {
        var accountName = email;
        var accountPassword = password;
        return new Promise((resolve, reject) => {
            this.myDataRef.createUser({
                email: accountName,
                password: accountPassword
            }, (error, userData) => {
                if (error) {
                    console.log("Error creating user:", error);
                    alert('Username was invalid or already taken!');
                    reject(error);
                } else {
                    alert('congrats, you made an account with the username ' + accountName + ' !');
                    resolve(userData);
                }
            });
        });
    }
    logInUser(email: string, password: string): async.IThenable<any> {
        let accountName = email;
        let accountPassword = password;
        return new Promise((resolve, reject) => {
            this.myDataRef.authWithPassword({
                email: email,
                password: password
            }, (error, authData) => {
                if (error) {
                    reject(error);
                } else {
                    this.UID = authData.uid;
                    this.setSpecificRef(this.UID);
                    resolve(authData);
                }
            });
        })
    }

    setSpecificRef(uid:string) {
       this.myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/users/' + uid);
    }

    postUserTask(taskName:Object) {
        console.log(taskName);
        this.myDataRefPosts.push({
            task: taskName
        })
       
    }
    
    getUserTasks() {
        console.log('getting tasks');
    }

}



register.injectable('firebase-svc', FirebaseService);
