var keystone = require('keystone');
var Section = keystone.list('Section');
var Photo = keystone.list('Photo');
var Audience = keystone.list('Audience');
// module.exports = function (req, res) {
//     res.send('Hello you learner, you');
// };

module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'section';
	locals.audience = 'audience';
	locals.photo = 'photo';

	view.query('sections', Section.model.find().sort('order'));
	view.query('audiences', Audience.model.find().sort('order'));
	view.query('photos', Photo.model.find().sort('order'));

	view.render('index');
  	// res.render('index');
};


//model.find().sort({name: 'criteria'}).exec(function(err, model) { ... }

