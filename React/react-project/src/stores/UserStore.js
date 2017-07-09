import {EventEmitter} from 'events';
import dispatcher from '../dispatcher'
import UserAction from '../actions/UserActions'
import userData from '../data/UserData'


class UserStore extends EventEmitter {
    evetTypes = {
        USER_REGISTERD: 'user_registered',
        USER_LOGED:'USER_LOGED'
    };

    loginUser(credentials){
        console.log('store')
        console.log(credentials)
        userData.login(credentials)
            .then(data=>{
                console.log(data)
                this.emit(this.evetTypes.USER_LOGED, data)
            })
    }

    registerUser(user) {
        console.log('reg store');
        userData.registerUser(user)
            .then((data)=>{

                this.emit(this.evetTypes.USER_REGISTERD, data)})
            .catch(error=>console.log(error))
    }

    handleAction(action) {
        console.log('reg store' + action);
        switch (action.type) {
            case UserAction.types.REGISTER_USER: {
                this.registerUser(action.user);
                break;}
            case UserAction.types.LOGIN_USER: {
                    this.loginUser(action.credentials);
                    break;
            }
            default:
                break
        }

    }


}


let userStore = new UserStore();

dispatcher.register(userStore.handleAction.bind(userStore));

export default userStore