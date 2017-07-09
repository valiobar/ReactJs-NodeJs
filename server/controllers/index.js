
const users = require('./users-controller')
const categoryController = require('./category-controller')

module.exports = {
  category:categoryController,
  users: users,

}
