import * as migration_20260927_023825_baseline from './20260927_023825_baseline';
import * as migration_20260927_033055_cms_v2 from './20260927_033055_cms_v2';

export const migrations = [
  {
    up: migration_20260927_023825_baseline.up,
    down: migration_20260927_023825_baseline.down,
    name: '20260927_023825_baseline',
  },
  {
    up: migration_20260927_033055_cms_v2.up,
    down: migration_20260927_033055_cms_v2.down,
    name: '20260927_033055_cms_v2'
  },
];
