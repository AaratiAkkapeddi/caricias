var keystone = require('keystone');

var User = new keystone.List('User', { 
	map: {name: 'displayName'}
});

User.add({
  displayName: { type: String, unique:true },
  password: { type: keystone.Field.Types.Password },
  email: { type: keystone.Field.Types.Email, unique: true },
});



User.schema.virtual('canAccessKeystone').get(function () {
  return true;
});
User.defaultColumns = 'displayName, email';
User.register();