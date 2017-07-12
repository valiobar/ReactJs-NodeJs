const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')

module.exports ={
  baseAuth:(req, res, next) => {

    if (!req.headers.authorization) {
      return res.status(401).end()
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1]

    // decode the token using a secret key-phrase
    return jwt.verify(token, 's0m3 r4nd0m str1ng', (err, decoded) => {
      // the 401 code is for unauthorized status
      if (err) { return res.status(401).end() }

      const userId = decoded.sub

      const user = User.findById(userId)
      if (!user) {
        return res.status(401).end()
      }

      req.user = user

      return next()
    })
  },
  adminAuth:(req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).end()
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1]

    // decode the token using a secret key-phrase
    return jwt.verify(token, 's0m3 r4nd0m str1ng', (err, decoded) => {
      // the 401 code is for unauthorized status
      if (err) { return res.status(401).end() }

      const userId = decoded.sub

      let user;
      User.findById(userId).then(document=>{
        user=document;

        if (!user) {
          console.log('no user')
          return res.status(401).end()
        }
        if (!(user.roles.indexOf('Admin')>-1)) {

          return res.status(401).end()
        }

        req.user = user

        return next()



      })


    })
  }
}
