const controllers = require('../controllers/index')
const auth = require('./auth')
const settings = require('./settings')
const bodyParser = require('body-parser')
module.exports = (app) => {
  app.post('/api/users/register',bodyParser.json(), controllers.users.registerPost)
  app.post('/api/users/login',bodyParser.json(), controllers.users.loginPost)
  app.get('/',bodyParser.json(), (req,res)=>res.send('wrok'))
}
