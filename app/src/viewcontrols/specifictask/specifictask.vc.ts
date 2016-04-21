import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class SpecifictaskViewControl extends BaseViewControl {
    templateString: string = require('./specifictask.vc.html');

    context: any = {};
}

register.viewControl('specifictask-vc', SpecifictaskViewControl);
