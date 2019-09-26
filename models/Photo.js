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

var Photo = new keystone.List('Photo', { 
	map: {name: 'title'}
});

Photo.add({
  title: { type: String, required: true, unique: true},
  text: { type: String, unique:false },
  photo: {type: Types.File, storage: s3_storage},
  order: {type: Types.Number},
  publishDate: { type: Types.Date, index: true }
});

Photo.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

Photo.schema.pre('save', function (next) {
  let photo = this;
  if (photo.isModified('published') && photo.published) {
    this.publishDate = Date.now();
  }
  return next();
});
Photo.relationship({ path: 'sections', ref: 'Section', refPath: 'photo' });

Photo.defaultColumns = 'title, text';
Photo.register();