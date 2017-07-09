const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const ObjectId =mongoose.Schema.Types.ObjectId;

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let categorySchema = new mongoose.Schema({
  name: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  description: { type: String},
  parent_category: { type: ObjectId,default:null},
  subCategories: { type: [ObjectId],default:null},
  products:{ type: [ObjectId],default:null},

})

/*userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})*/

let Category = mongoose.model('Category', categorySchema)

module.exports = Category
