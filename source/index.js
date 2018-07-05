import es from 'event-stream';
import PluginError from 'plugin-error';
import { Client } from 'minio';
import { lookup } from 'mime-types';

const PLUGIN_NAME = 'gulp-minio';

function gulpMinio(bucket, config) {
  if (!config)
    throw new PluginError(PLUGIN_NAME, 'Missing the minio configuration hash');

  if (!bucket)
    throw new PluginError(PLUGIN_NAME, 'Missing the name of chosen bucket!');

  let client = new Client(config)

  return es.map((file, cb) => {
    if (file.isDirectory()){
      return;
    }

    let meta = { 'Content-Type': lookup(file.path) };

    client.fPutObject(bucket, file.relative, file.path, meta, err => {
      if (err)
        throw new PluginError(PLUGIN_NAME, 'Error processing file to minio');
    });

    return cb();
  });
}

export default gulpMinio;
