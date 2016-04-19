import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class NewtaskViewControl extends BaseViewControl {
    templateString: string = require('./newtask.vc.html');

    context: any = {};
}

register.viewControl('newtask-vc', NewtaskViewControl);
