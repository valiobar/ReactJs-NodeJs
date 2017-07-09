const express = require('express')
const localSignupStrategy = require('./passport/local-signup')
const localLoginStrategy = require('./passport/local-login')
const bodyParser = require('body-parser')
const authCheck =require('./middleware/auth-check')
const passport = require('passport')
const cors = require('cors')

const settings = require('./settings')


module.exports = (app) => {



    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.use(passport.initialize())
   app.use(cors())

    passport.use('local-signup', localSignupStrategy)
    passport.use('local-login', localLoginStrategy)


    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user
        }
        next()
    })


    console.log('Express ready!')
}

