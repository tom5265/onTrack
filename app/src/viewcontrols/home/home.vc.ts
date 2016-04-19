import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import * as jQuery from 'jquery';

export default class HomeViewControl extends BaseViewControl {
  templateString: string = require('./home.vc.html');

  context: any = {
      currentTasks: ["Make Birdhouse", "Complete the bench in the backyard"]
  };


  addNewTask(){
      console.log('adding new task');
  }

  sendData() {
    var name = jQuery('#nameInput').val();
    var text = jQuery('#messageInput').val();
    if (name.length === 0) {
      alert('enter a name ya dingus');
      return;
    } if (text.length === 0) {
      alert('enter a message ya dingus')
      return;
    } else {
    myDataRefPosts.push(
      {
        name: name,
        text: text
      });
    jQuery('#messageInput').val('');
    jQuery('#nameInput').val('');
    alert('post successful!');
    }
  };

  createUser(email: string, password: string) {
    var accountName = jQuery('#newUserInput').val();
    var accountPassword = jQuery('#newPasswordInput').val();
    var myDataRefUsers = new Firebase('https://popping-inferno-1046.firebaseIO.com/rest/users');
    myDataRefUsers.createUser({
      email: accountName,
      password: accountPassword
    }, function (error, userData) {
      if (error) {
        console.log("Error creating user:", error);
        alert('Username was invalid or already taken!');
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        alert('congrats, you made an account with the username ' + accountName + ' !')
      }
    });
  }


  getMessages() {
    console.log('getMessages running');
    myDataRefPosts.on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  };


}
var myDataRefUsers = new Firebase('https://popping-inferno-1046.firebaseIO.com/rest/users');
var myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/rest/posts');
register.viewControl('home-vc', HomeViewControl);