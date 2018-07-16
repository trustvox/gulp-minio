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
    if (file.isDirectory())
      return;

    let meta = { 'Content-Type': lookup(file.path) };

    client.fPutObject(bucket, file.relative, file.path, meta, err => {
      if (err) {
        let message = `The file "${file.path}, was not processed by minio, ` +
                      `ERROR by minio was: ${err}`;

        throw new PluginError(PLUGIN_NAME, message);
      }
    });

    return cb();
  });
}

export default gulpMinio;
