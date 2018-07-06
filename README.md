# gulp-minio
> A gulp plugin to publish files to minio s3

![npm](https://img.shields.io/npm/v/gulp-minio.svg)

## Install

First, install `gulp-minio` as a development dependency:

```shell
npm install gulp-minio --save-dev
```

Then, add it to your `gulpfile.coffee` or `gulpfile.js`:

### Usage

Coffescript way:

```coffee
gulp  = require 'gulp'
minio = require 'gulp-minio'

bucket = 'my-bucket-name'

config = {
  endPoint: 'storage.example.com',
  secure: true,
  accessKey: 'your access key here',
  secretKey: 'your secret key here'
}

# suppose you want to publish public files:
gulp.src 'public/**/*'
  .pipe minio(bucket, config)
```

Or a decaff way:

```js
var bucket, config, gulp, minio;

gulp = require('gulp');
minio = require('gulp-minio');

bucket = 'my-bucket-name';

config = {
  endPoint: 'storage.example.com',
  secure: true,
  accessKey: 'your access key here',
  secretKey: 'your secret key here'
};

// suppose you want to publish public files:
gulp.src('public/**/*')
  .pipe(minio(bucket, config));
```
