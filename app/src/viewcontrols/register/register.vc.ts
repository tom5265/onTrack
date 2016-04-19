import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';
import firebaserepository from '../../repositories/firebase/firebase.repo';

export default class RegisterViewControl extends BaseViewControl {
    templateString: string = require('./register.vc.html');

    context: any = {};

    constructor(private firebaserepo: firebaserepository) {
        super();
    };




    createUser(email: string, password: string) {
        this.firebaserepo.createUser(email, password).then((success: any) => {
            console.log('success');
        }, (err: any) => {
            console.log('something went wrong!');
            console.log(err);
        });


    }
}


register.viewControl('register-vc', RegisterViewControl);