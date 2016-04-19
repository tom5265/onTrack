import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class FirebaseService extends BaseService {

}

register.injectable('firebase-svc', FirebaseService);
