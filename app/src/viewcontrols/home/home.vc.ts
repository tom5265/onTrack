import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';
import NewTaskViewControl from '../../viewcontrols/newtask/newtask.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';

export default class HomeViewControl extends BaseViewControl {
  templateString: string = require('./home.vc.html');

  context: any = {
      currentTasks: null,
      userSpecificId: ''
  };
  
  constructor(private firebaserepo: FirebaseRepository){
        super();
    }

  initialize(){

  }
  
  navigatedTo(parameters: { id: string; }) {
    var tempArray:Array<any> = [];
    let myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/users/' + this.context.userSpecificId)
    this.context.userSpecificId = parameters.id;
    console.log(myDataRefPosts);
    myDataRefPosts.on("child_added", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
    for(let prop in newPost){
         console.log(((newPost[prop].task.taskName)));
         let name = newPost[prop].task.taskName;
         tempArray.push(name);
    }
    });
    this.context.currentTasks = tempArray;
    

  };
  
  
  addNewTask(){
      this.navigator.navigate(NewTaskViewControl, {
          parameters: {
               id: this.context.userSpecificId
          }
          
      });
  }
  
  

}

register.viewControl('home-vc', HomeViewControl, [FirebaseRepository]);