import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about" ADD COLUMN "cv_id" integer;
  ALTER TABLE "about" ADD CONSTRAINT "about_cv_id_media_id_fk" FOREIGN KEY ("cv_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_cv_idx" ON "about" USING btree ("cv_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about" DROP CONSTRAINT "about_cv_id_media_id_fk";
  
  DROP INDEX "about_cv_idx";
  ALTER TABLE "about" DROP COLUMN "cv_id";`)
}
