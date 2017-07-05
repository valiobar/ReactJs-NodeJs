const PassportLocalStrategy = require('passport-local').Strategy
const User = require('mongoose').model('User')
const encryption = require('../../utilities/encryption')
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const user = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim()
    }
   User.findOne({email: user.email}).then(existingUser=>{
       console.log(existingUser)
        if (existingUser) {
            return done('E-mail already exists!')
        }

        let salt = encryption.generateSalt()
        let hashedPassword = encryption.generateHashedPassword(salt, user.password)

        User.create({
            email: user.email,
            salt: salt,
            hashedPass: hashedPassword
        }).then(user => {
            return done(null)
        }).catch(error=> {
            return done(error)
        })

    })



 })
