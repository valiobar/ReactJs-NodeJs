const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const PassportLocalStrategy = require('passport-local').Strategy
const encryption = require('../../utilities/encryption')

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const user = {
    email: email.trim(),
    password: password.trim()
  }

  User.findOne({email: user.email}).then(savedUser=>{
    if (!savedUser) {
      const error = new Error('Incorrect email or password')
      error.name = 'IncorrectCredentialsError'

      return done(error)
    }
console.log(user);
    const isMatch = savedUser.authenticate(user.password)

    if (!isMatch) {
      const error = new Error('Incorrect email or password')
      error.name = 'IncorrectCredentialsError'

      return done(error)
    }

    const payload = {
      sub: savedUser.id
    }

    // create a token string
    const token = jwt.sign(payload, 's0m3 r4nd0m str1ng')
    const data = {
      firstName: savedUser.firstName
    }

    return done(null, token, data)

  })


})
