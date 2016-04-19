import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';

export default class LoginViewControl extends BaseViewControl {
    templateString: string = require('./login.vc.html');

    context: any = {};
    
    constructor(private firebaserepo: FirebaseRepository) {
        super();
    }

    logInUser() {
        let email: string = jQuery('#emailInput').val();
        let password: string = jQuery('#passwordInput').val();
        this.authenticate(email, password);
    }

    authenticate(email:string , password:string) {
        console.log('step1');
        this.firebaserepo.logInUser(email, password).then((success: any) => {
            console.log(success);
            // this.context.uid = success.uid;
        }, (err: any) => {
            console.log('something went wrong!');
            console.log(err);
        });

    }

}

var ref = new Firebase("https://popping-inferno-1046.firebaseIO.com");

register.viewControl('login-vc', LoginViewControl, [FirebaseRepository]);
