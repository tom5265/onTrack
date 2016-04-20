import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import RedditService from '../../services/reddit/reddit.svc'

export default class RedditRepository extends BaseRepository {
    
containerArray: Array<any> = [];

    constructor(private RedditService: RedditService) {
        super();
    }

    getAllReddits(): async.IThenable<Array<any>> {
        if (this.containerArray.length === 0) {
            return this.RedditService.getList().then((success) => {
                this.containerArray = [];
                success.forEach((post) => {
                    let redd = {
                        title: post.data.title,
                        author: post.data.author,
                        id: post.data.id,
                        url: post.data.url,
                        selftext: post.data.selftext
                    }
                    this.containerArray.push(redd);
                });
                return this.containerArray;
            });
        } else {
            return this.Promise.resolve(this.containerArray);
        }   
    }

    getOneReddit(nameKey: any): async.IThenable<models.ISubReddit> {   
        return this.getAllReddits().then((reddits) => {
            for (var i = 0; i < reddits.length; i++) {
                if (reddits[i].id === nameKey) {
                    return reddits[i];
                }
            }
        });
    }
}

register.injectable('reddit-repo', RedditRepository, [RedditService]);
