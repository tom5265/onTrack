import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';
import RegisterViewControl from '../../viewcontrols/register/register.vc';
import HomeViewControl from '../../viewcontrols/home/home.vc';

export default class LoginViewControl extends BaseViewControl {
    templateString: string = require('./login.vc.html');

    context: any = {
        wrongPassword: false,
        wrongEmail: false,
        register: RegisterViewControl
    };
    
    constructor(private firebaserepo: FirebaseRepository) {
        super();
    }

    logInUser() {
        //hides wrong info divs in case in case they are showing
        if(this.context.wrongPassword === true){
            this.context.wrongPassword = false;
        }
        if(this.context.wrongEmail === true){
            this.context.wrongEmail = false;
        }
        
        let email: string = jQuery('#emailInput').val();
        let password: string = jQuery('#passwordInput').val();
        this.firebaserepo.logInUser(email, password).then((success: any) => {
            let UID = success.uid;
            this.navigator.navigate(HomeViewControl, {
                parameters: {
                    id: UID
                }
            });
        }, (err: any) => {
            //checks to see what exact error was thrown
            switch(err.code){
                case "INVALID_EMAIL":
                    this.context.wrongEmail = true;
                    break;
                case "INVALID_PASSWORD":
                    this.context.wrongPassword = true;
                    break;
            }
        });

    }

    //when the user clicks the password or email input the invalid info div is removed
    removeInvalid(){
        this.context.wrongPassword = false;
        this.context.wrongEmail = false;
    }

}

var ref = new Firebase("https://popping-inferno-1046.firebaseIO.com");

register.viewControl('login-vc', LoginViewControl, [FirebaseRepository]);
