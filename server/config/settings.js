const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://valiobar:123456@ds153682.mlab.com:53682/online-shop',
    port: 5000

  },
  staging: {
  },
  production: {
    port: process.env.PORT,
    rootPath: rootPath,
    db: 'mongodb://valiobar:Letmein1@ds030500.mlab.com:30500/bots',
  }
}
