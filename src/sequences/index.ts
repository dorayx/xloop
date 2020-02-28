import fs from 'fs';
import path from 'path';

export * from './sequence';

const modulesRoot = path.resolve(__dirname, 'modules');
const modulesPath = fs
  .readdirSync(modulesRoot)
  .filter(module => /\.js$/.test(module));
modulesPath.forEach(mod => require(path.resolve(modulesRoot, mod)));
