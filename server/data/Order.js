const mongoose = require('mongoose')
const ObjectId =mongoose.Schema.Types.ObjectId;

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let orderSchema = new mongoose.Schema({
    totalSum: { type: Number, default:0 },
    client: { type: ObjectId,required: REQUIRED_VALIDATION_MESSAGE},
    isProcessed:{type:Boolean,default:false},
    products: { type: [ObjectId],default:[]},
    time_stamp:{ type: Date,default:Date.now()},

})

/*userSchema.method({
 authenticate: function (password) {
 return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
 }
 })*/

let Order = mongoose.model('Order', orderSchema)

module.exports = Order