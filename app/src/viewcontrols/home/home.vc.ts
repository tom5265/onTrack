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

  }
  
  navigatedTo(parameters: { id: string; }) {
    this.context.userSpecificId = parameters.id;
    // this.firebaserepo.getUserTasks(this.context.UserSpecificId);
    this.myDataRefPosts.on("child_added", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
    console.log(newPost);
    });

  };
  
  
  addNewTask(){
      this.navigator.navigate(NewTaskViewControl, {
          parameters: {
               id: this.context.userSpecificId
          }
          
      });
  }
  
  

myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/users/' + this.context.userSpecificId)
}

register.viewControl('home-vc', HomeViewControl, [FirebaseRepository]);