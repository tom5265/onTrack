import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';
import firebaserepository from '../../repositories/firebase/firebase.repo';
import LoginViewControl from '../../viewcontrols/login/login.vc';

export default class RegisterViewControl extends BaseViewControl {
    templateString: string = require('./register.vc.html');

    context: any = {
        uid: ''
    };

    constructor(private firebaserepo: firebaserepository) {
        super();
    };
    


    registerUser() {
        let email:string = jQuery('#emailInput').val();
        let password:string = jQuery('#passwordInput').val();
        this.createUser(email,password);
    }

    createUser(email: string, password: string) {
        this.firebaserepo.createUser(email, password).then((success: any) => {
            console.log(success.uid);
            this.context.uid = success.uid;
            this.navigator.navigate(LoginViewControl);
        }, (err: any) => {
            console.log('something went wrong!');
            console.log(err);
        });


    }
}


register.viewControl('register-vc', RegisterViewControl, [firebaserepository]);