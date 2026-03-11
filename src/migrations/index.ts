import * as migration_20260311_175610 from './20260311_175610';
import * as migration_20260311_192407 from './20260311_192407';

export const migrations = [
  {
    up: migration_20260311_175610.up,
    down: migration_20260311_175610.down,
    name: '20260311_175610',
  },
  {
    up: migration_20260311_192407.up,
    down: migration_20260311_192407.down,
    name: '20260311_192407'
  },
];
