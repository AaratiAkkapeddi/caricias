var keystone = require('keystone');
var Types = keystone.Field.Types;
var s3_storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
   	key: process.env.S3_KEY, // required; defaults to 
    secret: process.env.S3_SECRET, // required; defaults to 
    bucket: 'caricias', // required; defaults to process.env.S3_BUCKET
    region: 'us-east-2', // optional; defaults to process.env.S3_REGION, or if that's not specified, us-east-1
    path: '/', // optional; defaults to "/"
    headers: {
            'x-amz-acl': 'public-read', // add default headers; see below for details
        }
  },
  schema: {
    bucket: true, // optional; store the bucket the file was uploaded to in your db
    etag: true, // optional; store the etag for the resource
    path: true, // optional; store the path of the file in your db
    url: true, // optional; generate & store a public URL
  },
});

var Audience = new keystone.List('Audience', { 
	map: {name: 'title'}
});

Audience.add({
  title: { type: String, required: true, unique: true},
  photos: { type: Types.Relationship, ref: 'Photo', many: true },
  published: { type: Boolean },
  order: {type: Types.Number},
  design:  { type: Types.Select, options: ['single-image','overlap-left','overlap-right'] },
});

Audience.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

Audience.schema.pre('save', function (next) {
  let audience = this;
  if (audience.isModified('published') && audience.published) {
    this.publishDate = Date.now();
  }
  return next();
});
Audience.relationship({  path: 'photos', ref: 'Photo', refPath: 'audience'});

Audience.defaultColumns = 'title';
Audience.register();