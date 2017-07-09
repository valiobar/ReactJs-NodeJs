import dispatcher from '../dispatcher'
import userstore from '../stores/UserStore'


const userActions = {
    types: {
        REGISTER_USER: 'REGISTER_USER',
        LOGIN_USER:'LOGIN_USER'
    },
    register(user){
        console.log(userstore)
        dispatcher.dispatch({
            type: 'REGISTER_USER',
            user
        })
    },
    login(credentials){
        console.log(credentials)
        dispatcher.dispatch({
            type: 'LOGIN_USER',
            credentials
        })
    }
}
export default userActions