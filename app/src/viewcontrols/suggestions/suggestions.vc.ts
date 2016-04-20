import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class SuggestionsViewControl extends BaseViewControl {
    templateString: string = require('./suggestions.vc.html');

    context: any = {};
}

register.viewControl('suggestions-vc', SuggestionsViewControl);
