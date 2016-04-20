import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';
import NewTaskViewControl from '../../viewcontrols/newtask/newtask.vc';

export default class HomeViewControl extends BaseViewControl {
  templateString: string = require('./home.vc.html');

  context: any = {
      currentTasks: ["Make Birdhouse", "Complete the bench in the backyard"]
  };

  initialize(){
      console.log('hello world');
  }
  
  
  addNewTask(){
      this.navigator.navigate(NewTaskViewControl);
  }


}
var myDataRefUsers = new Firebase('https://popping-inferno-1046.firebaseIO.com/rest/users');
var myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/rest/posts');
register.viewControl('home-vc', HomeViewControl);