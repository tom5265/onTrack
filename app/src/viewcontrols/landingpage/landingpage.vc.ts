import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class LandingpageViewControl extends BaseViewControl {
    templateString: string = require('./landingpage.vc.html');

    context: any = {};
}

register.viewControl('landingpage-vc', LandingpageViewControl);
