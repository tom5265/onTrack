import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';

export default class FirebaseRepository extends BaseRepository {

}

register.injectable('firebase-repo', FirebaseRepository);
