import {App, events, register, routing, web} from 'platypus';
import HomeViewControl from '../viewcontrols/home/home.vc';
import RegisterViewControl from '../viewcontrols/register/register.vc';
import LoginViewControl from '../viewcontrols/login/login.vc';
import WelcomeViewControl from '../viewcontrols/welcome/welcome.vc';
import NewTaskViewControl from '../viewcontrols/newtask/newtask.vc';


export default class MyApp extends App {
    constructor(router: routing.Router, config: web.IBrowserConfig) {
        super();

		config.routingType = config.STATE;

        router.configure([
            { pattern: '', view: LoginViewControl },
            { pattern: '/login', view: LoginViewControl }, 
            { pattern: '/register', view: RegisterViewControl },
            { pattern: '/welcome', view: WelcomeViewControl },
            { pattern: '/newtask/:id', view: NewTaskViewControl },
            { pattern: '/home/:id', view: HomeViewControl}
        ]);
    }

    error(ev: events.ErrorEvent<Error>): void {
        console.log(ev.error);
    }
}

register.app('app', MyApp, [
    routing.Router,
    web.IBrowserConfig
]);
