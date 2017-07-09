import urls from '../helpers/appURLs'
import apiCalls from '../helpers/apiCalls/apiCalls'

class UserData {
     baseUrl = 'http://localhost:5000/api/users/register'

    static login(credentials){
        return apiCalls.post(credentials,'users/login')
    }

    static registerUser(user){
        return apiCalls.post(user,'users/register')

    }


}
export default UserData