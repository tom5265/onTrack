import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class LoginViewControl extends BaseViewControl {
    templateString: string = require('./login.vc.html');

    context: any = {};

    logInUser() {
        let email: string = jQuery('#emailInput').val();
        let password: string = jQuery('#passwordInput').val();
        this.authenticate(email, password);
    }

    authenticate(email:string , password:string) {
        ref.authWithPassword({
            email: email,
            password: password
        }, function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        });

    }

}

var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");

register.viewControl('login-vc', LoginViewControl);
