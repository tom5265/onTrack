import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import RedditRepository from '../../repositories/reddit/reddit.repo'
import HomeViewControl from '../../viewcontrols/home/home.vc';
import * as jQuery from 'jquery';

export default class SuggestionsViewControl extends BaseViewControl {
    templateString: string = require('./suggestions.vc.html');

    constructor(private redditrepo: RedditRepository) {
        super();
    }

    context: any = {
        reddits: <Array<any>>[],
        home: HomeViewControl
    };

    navigatedTo(): void {
        this.redditrepo.getAllReddits().then((success) => {
            console.log(success);
            this.context.reddits = success;
        }, (err) => {
            console.log('something went wrong!');
            console.log(err);
        });       
    }
    
    
}

register.viewControl('suggestions-vc', SuggestionsViewControl, [RedditRepository]);
