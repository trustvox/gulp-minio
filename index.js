import Minio from 'minio';
import es from 'event-stream';
import PluginError from 'plugin-error';
import { lookup } from 'mime';

// Consts
const PLUGIN_NAME = 'gulp-minio';

function gulpMinio(bucket, config) {
  if (!config)
    throw new PluginError(PLUGIN_NAME, 'Missing the minio configuration hash');

  if (!bucket)
    throw new PluginError(PLUGIN_NAME, 'Missing the name of chosen bucket!');

  client = new Minio.Client(config)

  return es.map((file, cb) => {
    if (file.isDirectory())
      continue;

    let meta = { 'Content-Type': lookup(file.path) };

    client.fPutObject(bucket, file.relative, file.path, meta, err => {
      if (err)
        throw new PluginError(PLUGIN_NAME, 'Error processing file to minio');
    });

    return cb();
  });
}

export default gulpMinio;
