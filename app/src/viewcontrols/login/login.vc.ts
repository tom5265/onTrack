import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';
import RegisterViewControl from '../../viewcontrols/register/register.vc';
import HomeViewControl from '../../viewcontrols/home/home.vc';

export default class LoginViewControl extends BaseViewControl {
    templateString: string = require('./login.vc.html');

    context: any = {
        register: RegisterViewControl
    };
    
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
            console.log('logging in..');
            this.navigator.navigate(HomeViewControl);
            // this.context.uid = success.uid;
        }, (err: any) => {
            console.log('something went wrong!');
            this.wrongPassword();
        });

    }
    
    //displays div when password is wrong
    wrongPassword(){
        jQuery('#passwordInput').after("<div class='invalid-password'>Invalid Password</div>");
    }
    //when the user clicks the password input the invalid password div is removed
    removeInvalid(){
        jQuery(".invalid-password").remove();
    }

}

var ref = new Firebase("https://popping-inferno-1046.firebaseIO.com");

register.viewControl('login-vc', LoginViewControl, [FirebaseRepository]);
