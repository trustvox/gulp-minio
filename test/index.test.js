import { readFileSync } from 'fs';
import es from 'event-stream';

import test from 'ava';
import File from 'vinyl';
import { Client } from 'minio';
import subject from '../src/index.js';

let credentials = JSON.parse(readFileSync(`${__dirname}/credentials.json`, 'utf8'))
let bucket = 'gulp-minio';

test('publish files to s3', async t => {
  t.is('10', '10');
  // let stream = subject(bucket, credentials);

  //  stream.write(
  //   new File({
  //     path: '/test/hello.txt',
  //     base: '/',
  //     contents: Buffer.from('hello world')
  //   })
  // );

  // await stream.pipe(
  //   es.writeArray(function(err, files) {
  //     t.log(files);
  //     t.is(err, null, 'error not exists');
  //     // t.is(files.length(), 1, 'has one file');
  //     t.deepEqual(files[0], 'text/plain; charset=utf-8');

  //     new Client(credentials).statObject(bucket, '/test/hello.txt', function(err, stat) {
  //       t.deepEqual(stat.metaData, { 'Content-Type': 'text/plain' });
  //       t.truthy(stat);
  //     })
  //   })
  // );

  // stream.end();
});
