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

var Section = new keystone.List('Section', { 
	map: {name: 'title'}
});

Section.add({
  title: { type: String, required: true, unique: true},
  css_id: { type: String, unique: false },
  text: { type: Types.Html, wysiwyg: true },
  video: {type: Types.File, storage: s3_storage},
  audio: {type: Types.File, storage: s3_storage},
  transcript_english:{ type: String},
  transcript_spanish:{ type: String},
  photos: { type: Types.Relationship, ref: 'Photo', many: true },
  order: {type: Types.Number},
  width:  { type: Types.Select, options: ['full-width', 'half-width','quarter-width','three-quarters-width'] },
  design:  { type: Types.Select, options: ['image-inside-image', 'slideshow','gallery','text','audio-portrait-left','audio-portrait-right', 'full-bleed-image', 'video'] }
});

Section.schema.virtual('canAccessKeystone').get(function () {
  return true;
});


Section.relationship({  path: 'photos', ref: 'Photo', refPath: 'section'});

Section.defaultColumns = 'title, design, order';
Section.register();