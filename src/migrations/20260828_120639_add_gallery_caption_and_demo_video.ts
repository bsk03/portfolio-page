import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_screenshots" ADD COLUMN "caption" varchar;
  ALTER TABLE "projects" ADD COLUMN "demo_video_id" integer;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_demo_video_id_media_id_fk" FOREIGN KEY ("demo_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "projects_demo_video_idx" ON "projects" USING btree ("demo_video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" DROP CONSTRAINT "projects_demo_video_id_media_id_fk";
  
  DROP INDEX "projects_demo_video_idx";
  ALTER TABLE "projects_screenshots" DROP COLUMN "caption";
  ALTER TABLE "projects" DROP COLUMN "demo_video_id";`)
}
