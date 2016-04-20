import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import RedditRepository from '../../repositories/reddit/reddit.repo'

export default class SuggestionsViewControl extends BaseViewControl {
    templateString: string = require('./suggestions.vc.html');
    
    constructor(private redditrepo: RedditRepository) {
        super();
    }

    context: any = {
        reddits: <Array<any>>[]
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
    
    //  readMore(postId: string): void {
    //     this.navigator.navigate(SinglePostViewControl, {
    //         parameters: {
    //             id: postId
    //         }
    //     }
    //     )}
    
}

register.viewControl('suggestions-vc', SuggestionsViewControl, [RedditRepository]);
