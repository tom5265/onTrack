import {Utils, async} from 'platypus';

export default class BaseRepository {
	protected static _inject: any = {
        utils: Utils,
        Promise: async.IPromise
    };

	protected utils: Utils;
    protected Promise: async.IPromise;
}
