import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class WelcomeViewControl extends BaseViewControl {
    templateString: string = require('./welcome.vc.html');

    context: any = {};
}

register.viewControl('welcome-vc', WelcomeViewControl);
