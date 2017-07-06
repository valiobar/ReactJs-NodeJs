import React from 'react'
import styles from './Header.css'
import {Navbar,NavItem,Icon} from 'react-materialize'
class Header extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
        <Navbar  brand='logo' right>
          <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
          <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
          <NavItem href='/user/register'><Icon>person_add</Icon><p>Register</p></NavItem>
          <NavItem href='/user/login'><Icon>create</Icon><p>Login</p></NavItem>
        </Navbar>
    )
  }
}
export default Header