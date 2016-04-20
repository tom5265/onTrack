import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

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
                        console.log("Successfully created user account with uid:", userData.uid);
                        alert('congrats, you made an account with the username ' + accountName + ' !');
                        resolve(userData);
                    }
            });
        });
    }
    logInUser(email: string, password: string) {
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
                console.log("Authenticated successfully with payload:", authData);
                resolve(authData);
            }
        });
        })
    }
    postUserTask(taskName:string){
        console.log(taskName);
        return new Promise((resolve, reject) => {
            myDataRef.push({
            task: taskName
            }, function (error, success) {
                if(error){
                    console.log(error)
                } else{
                    console.log('pushed task to server!');
                }
        });
        })
    }
    getUserTasks(){
        console.log('getting tasks');
    }

}

var myDataRef = new Firebase('https://popping-inferno-1046.firebaseIO.com/');


register.injectable('firebase-svc', FirebaseService);
