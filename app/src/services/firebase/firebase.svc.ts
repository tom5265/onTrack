import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

let UID:any = [];

export default class FirebaseService extends BaseService {


    createUser(email: string, password: string): async.IThenable<any> {
        var accountName = email;
        var accountPassword = password;
        return new Promise((resolve, reject) => {
            myDataRef.createUser({
                email: accountName,
                password: accountPassword
            }, function (error, userData) {
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
            myDataRef.authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error) {
                    reject(error);
                } else {
                    UID.push(authData.uid)
                    resolve(authData);
                }
            });
        })
    }

    postUserTask(taskName: string) {
        console.log(taskName);
        myDataRefPosts.push({
            task: taskName
        })
    }
    
    getUserTasks() {
        console.log('getting tasks');
    }

}

var myDataRef = new Firebase('https://popping-inferno-1046.firebaseIO.com');
var myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/users/' + UID[0]);



register.injectable('firebase-svc', FirebaseService);
