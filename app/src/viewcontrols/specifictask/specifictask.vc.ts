import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import FirebaseRepository from '../../repositories/firebase/firebase.repo';
import * as jQuery from 'jquery';
import HomeViewControl from '../../viewcontrols/home/home.vc';




export default class SpecifictaskViewControl extends BaseViewControl {
    templateString: string = require('./specifictask.vc.html');

    context: any = {
        specificTask: null,
        post: [],
        checkpoints: 0,
        completedCheckpoints: 0,
        home: HomeViewControl,
        modal: false,
        modal2: false,
        modal3: false
    };

    publickey = '';

    constructor(private firebaserepo: FirebaseRepository) {
        super();
    }
    


    navigatedTo(parameters: { key: string, id:string}) {
        console.log('inside navto');
        console.log(parameters.key);
        let tempArray: any = null;
        let key = parameters.key;
        this.publickey = key;
        let myDataRefPosts = new Firebase('https://popping-inferno-1046.firebaseIO.com/users/' + this.firebaserepo.userID + '/' + key);
        myDataRefPosts.on("value", (snapshot: any, prevChildKey: any) => {
            let data = snapshot.val();
            if(data.task.completionDate === ''){
                console.log('no date set');
                jQuery('.date-container').hide();
            }else{
                console.log('date set');
                jQuery('.date-container').show();
            }
            let task = {
                taskName: data.task.taskName,
                taskObjectives: data.task.taskObjectives,
                completionDate: data.task.completionDate
            }

            this.context.specificTask = task;
            this.context.checkpoints = task.taskObjectives.length;
            let numberCompleted = 0;
            task.taskObjectives.forEach((obj: any) => {
                if (obj.isCompleted) {
                    numberCompleted++;
                }
            });
            this.context.completedCheckpoints = numberCompleted;
            if (numberCompleted > 0) {
                // console.log('o');
                if (task.taskObjectives.length === numberCompleted) {
                    let bg = document.getElementById('color-bg');
                    bg.style.backgroundColor = "rgba(201,278,114,0.1)";
                    let button = jQuery('#deleteButton');
                    button.text('Complete Task');
                    button.addClass('animated');
                    button.addClass('tada');
                    button.css({'backgroundColor' : '#68c2a4','borderColor' : '#68c2a4'})
                } else {
                    let bg = document.getElementById('color-bg')
                    bg.style.backgroundColor = 'rgba(250,255,255,0.2)';
                    let button = jQuery('#deleteButton');
                    button.removeClass('animated tada')
                    button.text('Delete Task');
                    button.css({'backgroundColor' : '#ef716f','borderColor' : '#ef716f'})
                }
            }
                console.log(this.context.specificTask);  
                this.compareDates(this.context.specificTask.completionDate);
        });   
    };
    
    loaded(){
        this.compareDates(this.context.specificTask.completionDate);
    }
    
    deleteThisPost() {

        if (this.context.checkpoints != this.context.completedCheckpoints) {
            this.context.modal2 = true;
        } else {
            if(jQuery(".off-track-bubble").css('display') === 'block'){
                this.context.modal3 = true;
            }
            if(jQuery(".on-track-bubble").css('display') === 'block'){
                this.context.modal = true;
            }
        }
    }
    
    hideModal(num:number){
        if(num === 1){
            this.context.modal = false;
        }
        if(num === 2){
            this.context.modal2 = false;
        }
        
        if(num === 3){
            this.context.modal3 = false;
        }
    }
    
    continueModal(){
        this.firebaserepo.deleteThisPost(this.publickey, this.firebaserepo.userID);
        this.navigator.navigate(HomeViewControl);
    }

    someFunc() {
        let numberOfTrues = document.getElementsByClassName('true');
        this.context.completedCheckpoints = numberOfTrues.length;
        let numberOfTasks = document.getElementsByClassName('task');
        this.context.checkpoints = numberOfTasks.length;
        if (numberOfTrues.length > 0) {
            if (numberOfTrues == numberOfTasks) {
                console.log('congrats');
            }
        }
        this.firebaserepo.updateUserTask(this.context.specificTask, this.publickey);
    }
    
    compareDates(setDate:any) {
        console.log('comparing...');
        let now = new Date();
        let set = new Date(setDate);
        if(this.context.specificTask.completionDate !== ''){ //if date is present
            if (now < set) { //if on track
                jQuery('#on-track').show()
            } else { //if too late
                jQuery('#off-track').show()
            }
        }else{
            console.log('no date');
        }
    }
};



register.viewControl('specifictask-vc', SpecifictaskViewControl, [FirebaseRepository]);
