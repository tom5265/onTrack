import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class RegisterViewControl extends BaseViewControl {
    templateString: string = require('./register.vc.html');

    context: any = {};
}

register.viewControl('register-vc', RegisterViewControl);
