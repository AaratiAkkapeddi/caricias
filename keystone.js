var keystone = require('keystone');

keystone.init({
  'cookie secret': 'secure string goes here',
  'name': 'my-project',
  'user model': 'User',
  'auto update': true,
  'auth': true,
  'updates':'./updates',
  'views': 'templates/views',
  'view engine': 'pug',
  'static': ['public'],
});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.start();

//  'mongo':process.env.MONGO_URI || "mongodb://localhost/caricias",