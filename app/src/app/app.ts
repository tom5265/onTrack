import {App, events, register, routing, web} from 'platypus';
import HomeViewControl from '../viewcontrols/home/home.vc';
import RegisterViewControl from '../viewcontrols/register/register.vc';
import LoginViewControl from '../viewcontrols/login/login.vc';
import WelcomeViewControl from '../viewcontrols/welcome/welcome.vc';
import NewTaskViewControl from '../viewcontrols/newtask/newtask.vc';
import SuggestionsViewControl from '../viewcontrols/suggestions/suggestions.vc';
import SpecificTaskViewControl from '../viewcontrols/specifictask/specifictask.vc';



export default class MyApp extends App {
    constructor(router: routing.Router, config: web.IBrowserConfig) {
        super();

		// config.routingType = config.STATE;

        router.configure([
            { pattern: '', view: LoginViewControl },
            { pattern: '/login', view: LoginViewControl }, 
            { pattern: '/register', view: RegisterViewControl },
            { pattern: '/welcome', view: WelcomeViewControl },
            { pattern: '/newtask/:id', view: NewTaskViewControl },
            { pattern: '/home/:id', view: HomeViewControl},
            { pattern: '/suggestions', view: SuggestionsViewControl },
            { pattern: '/home/:id/:key', view: SpecificTaskViewControl }
        ]);
    }

    error(ev: events.ErrorEvent<Error>): void {
        console.log(ev.error);
    }
    
    ready() {
        setTimeout(() => {
            if ((<any>window).navigator) {
                (<any>window).navigator.splashscreen.hide();
            }
        }, 3000);
    }
}

register.app('app', MyApp, [
    routing.Router,
    web.IBrowserConfig
]);
