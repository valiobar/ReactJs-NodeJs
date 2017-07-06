const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
  email: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  firstName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  lastName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  salt: String,
  hashedPass: String,
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, 'mega stra5nata par0la')

    User.create({
      email: 'Admin',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']
    })
  })
}
