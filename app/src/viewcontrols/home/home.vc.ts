import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';
import NewTaskViewControl from '../../viewcontrols/newtask/newtask.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';

export default class HomeViewControl extends BaseViewControl {
  templateString: string = require('./home.vc.html');

  context: any = {
      currentTasks: ["Make Birdhouse", "Complete the bench in the backyard"],
      userSpecificId: ''
  };
  
  constructor(private firebaserepo: FirebaseRepository){
        super();
    }

  initialize(){
      console.log('inits');
  }
  
  navigatedTo(parameters: { id: string; }) {
    this.context.userSpecificId = parameters.id;
    console.log(this.context.userSpecificId);
    this.firebaserepo.getUserTasks(this.context.UserSpecificId);
  };
  
  
  addNewTask(){
      this.navigator.navigate(NewTaskViewControl, {
          parameters: {
               id: this.context.userSpecificId
          }
          
      });
  }


}
// var myDataRefUsers = new Firebase('https://popping-inferno-1046.firebaseIO.com/rest/users');
// var myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/rest/posts');
register.viewControl('home-vc', HomeViewControl, [FirebaseRepository]);