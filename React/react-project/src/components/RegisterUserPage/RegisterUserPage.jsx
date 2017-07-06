import React from 'react'
import styles from './RegisterUserPage.css'
import {Input, Button} from 'react-materialize'
class RegisterUserPage extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            user:{
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                confirmPassword:''
            },
            error:{}
        }
    }

    handleInputChange(event) {
        const target = event.target
        const field = target.name
        const value = target.value
         const user= this.state.user
       user[field]=value;
        this.setState({user})
    }


    render() {
        return (

            <div className={styles.container}>
                <div className="col-md-6 col-md-offset-3">
                    <Input
                        onChange={this.handleInputChange.bind(this)}
                        error=""
                        validate="true"
                        type="email"
                        label="Email"
                        name='email'/>
                </div>
                <div className="col-md-3 col-md-offset-3">
                    <Input
                        onChange={this.handleInputChange.bind(this)}
                        name='firstName'
                        error=""
                        label="First Name"/>
                </div>
                <div className="col-md-3 ">
                    <Input
                        onChange={this.handleInputChange.bind(this)}
                        name='lastName'
                        error=""
                        label="Last Name"/>
                </div>
                <div className="col-md-3 col-md-offset-3">
                    <Input
                        onChange={this.handleInputChange.bind(this)}
                        name='password'
                        type="password"
                        label="Password"/>
                </div>
                <div className="col-md-3 ">
                    <Input
                        onChange={this.handleInputChange.bind(this)}
                        name='confirmPassword' type="password" label="Confirm password"/>
                </div>

                <div className="col-md-6 col-md-offset-3">
                    <Button waves='light'>Register</Button>
                </div>

            </div>
        )
    }
}
export default RegisterUserPage