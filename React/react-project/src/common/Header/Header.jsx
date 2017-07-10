import React from 'react'
import Auth from '../appRouter/Auth'
import {Link} from 'react-router-dom'
import userStore from '../../stores/UserStore'
class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username:""
        }
        this.handelUserLoggedIn = this.handelUserLoggedIn.bind(this)
        userStore.on(userStore.evetTypes.USER_LOGED, this.handelUserLoggedIn)
    }


    handelUserLoggedIn(data) {
        if (data.success) {
            this.setState({username: data.user.firstName})
        }
    }
    componentWillMount(){
        if(Auth.getUser()){
            this.setState({username: Auth.getUser().firstName})
        }
    }

    componentWillUnmount() {
        userStore.removeListener(userStore.evetTypes.USER_LOGED, this.handelUserLoggedIn)
    }

    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">WebSiteName</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/">Page 1</Link></li>
                        <li><Link to="/">Page 2</Link></li>
                    </ul>
                    {Auth.isUserAuthenticated() ? (<ul className="nav navbar-nav navbar-right">
                        <li><Link to="/user/profile">
                            <span className="glyphicon glyphicon-user"></span> {this.state.username}</Link></li>
                        <li><Link to="/user/logout">
                            <span className="glyphicon glyphicon-log-out"></span> Logout</Link></li>

                    </ul>) : (
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/user/register"><span className="glyphicon glyphicon-user"></span>
                                Register</Link></li>
                            <li><Link to="/user/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link>
                            </li>
                        </ul>
                    )}
                    {Auth.isUserAuthenticated()&&Auth.getUser().roles.indexOf('Admin')>-1?(
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/admin/panel">
                                <span className="glyphicon glyphicon-edit"></span> Admin Panel</Link></li>
                        </ul>
                    ):(<ul>
                       </ul>)}



                </div>
            </nav>

        )
    }
}
export default Header