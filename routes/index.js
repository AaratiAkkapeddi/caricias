var keystone = require('keystone');
var importRoutes = keystone.importer(__dirname);


var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api'),
};

exports = module.exports = function (app) {
  app.get('/', routes.views.index)
  // app.get('/blog', routes.views.blog)
  // app.get('/resources', routes.views.resources)
 
};