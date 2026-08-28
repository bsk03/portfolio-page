import * as migration_20260311_193348 from './20260311_193348';
import * as migration_20260828_112232_add_experience from './20260828_112232_add_experience';
import * as migration_20260828_115600_add_cv_to_about from './20260828_115600_add_cv_to_about';
import * as migration_20260828_120639_add_gallery_caption_and_demo_video from './20260828_120639_add_gallery_caption_and_demo_video';
import * as migration_20260828_120737_add_project_status from './20260828_120737_add_project_status';

export const migrations = [
  {
    up: migration_20260311_193348.up,
    down: migration_20260311_193348.down,
    name: '20260311_193348',
  },
  {
    up: migration_20260828_112232_add_experience.up,
    down: migration_20260828_112232_add_experience.down,
    name: '20260828_112232_add_experience',
  },
  {
    up: migration_20260828_115600_add_cv_to_about.up,
    down: migration_20260828_115600_add_cv_to_about.down,
    name: '20260828_115600_add_cv_to_about',
  },
  {
    up: migration_20260828_120639_add_gallery_caption_and_demo_video.up,
    down: migration_20260828_120639_add_gallery_caption_and_demo_video.down,
    name: '20260828_120639_add_gallery_caption_and_demo_video',
  },
  {
    up: migration_20260828_120737_add_project_status.up,
    down: migration_20260828_120737_add_project_status.down,
    name: '20260828_120737_add_project_status'
  },
];
