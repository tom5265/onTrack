import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class FirebaseService extends BaseService {


    createUser(email: string, password: string): async.IThenable<any> {
        var accountName = email;
        var accountPassword = password;
        var myDataRefUsers = new Firebase('https://popping-inferno-1046.firebaseIO.com/rest/users');
        return new Promise((resolve, reject) => {
            myDataRefUsers.createUser({
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


}

register.injectable('firebase-svc', FirebaseService);
