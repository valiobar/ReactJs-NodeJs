const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const ObjectId =mongoose.Schema.Types.ObjectId;

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let productSchema = new mongoose.Schema({
  name: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  description: { type: String},
  category: { type: ObjectId,default:null},
  price: { type: Number,required: REQUIRED_VALIDATION_MESSAGE},
  images:{type: [String],default:[]} ,
  time_stamp:{ type: Date,default:Date.now()},

})

/*userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})*/

let Product = mongoose.model('Product', productSchema)

module.exports = Product
