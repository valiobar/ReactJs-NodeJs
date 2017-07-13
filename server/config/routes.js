const controllers = require('../controllers/index')
const auth = require('./middleware/auth-check')
const settings = require('./settings')
const bodyParser = require('body-parser')
module.exports = (app) => {
  app.post('/api/users/register',bodyParser.json(), controllers.users.registerPost)
  app.post('/api/users/login',bodyParser.json(), controllers.users.loginPost)
  app.get('/api/user/profile/:id',bodyParser.json(),auth.baseAuth, controllers.users.getProfile)
  app.post('/api/user/cart',bodyParser.json(),auth.baseAuth, controllers.users.postToUserPasket)
  app.post('/api/user/order',bodyParser.json(),auth.baseAuth, controllers.users.createOrder)
  app.get('/api/admin/panel',bodyParser.json(),auth.adminAuth, controllers.users.getProfile)
  app.post('/api/admin/category/create',bodyParser.json(),auth.adminAuth, controllers.category.categoryCreate)
  app.get('/api/admin/category/all',bodyParser.json(),auth.adminAuth, controllers.category.gatAll)
  app.post('/api/admin/product/create',bodyParser.json(),auth.adminAuth, controllers.products.productCreate)
   app.get('/api/product/all',bodyParser.json(), controllers.products.gatAll)



  app.get('/',bodyParser.json(), (req,res)=>res.send('work'))
}
