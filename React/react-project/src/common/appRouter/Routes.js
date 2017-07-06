import React from 'react';
import HomePage from '../../components/HomePage'
import RegisterUserPage from '../../components/RegisterUserPage'
import LoginUserPage from '../../components/LoginUserPage'
import { Route, Switch, Redirect } from 'react-router-dom'
// code skipped for brevity

const Routes = () => (
    <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/home' component={HomePage} />
        <Route path='/user/register' component={RegisterUserPage} />
        <Route path='/user/login' component={LoginUserPage} />
    {/*
        <Redirect from='/about-us' to='/about' />
        <Route component={NotFoundPage} /> */}
    </Switch>
)

export default Routes