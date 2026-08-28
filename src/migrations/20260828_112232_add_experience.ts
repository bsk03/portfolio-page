import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_experience_icon" AS ENUM('code', 'briefcase', 'rocket', 'trophy', 'graduation', 'terminal');
  CREATE TYPE "public"."enum_experience_workplace" AS ENUM('remote', 'hybrid', 'onsite');
  CREATE TABLE "experience_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "experience" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"company_url" varchar,
  	"icon" "enum_experience_icon" DEFAULT 'code',
  	"workplace" "enum_experience_workplace" DEFAULT 'remote',
  	"location" varchar,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"current" boolean DEFAULT false,
  	"end_date" timestamp(3) with time zone,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "projects" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "experience_id" integer;
  ALTER TABLE "experience_technologies" ADD CONSTRAINT "experience_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "experience_technologies_order_idx" ON "experience_technologies" USING btree ("_order");
  CREATE INDEX "experience_technologies_parent_id_idx" ON "experience_technologies" USING btree ("_parent_id");
  CREATE INDEX "experience_updated_at_idx" ON "experience" USING btree ("updated_at");
  CREATE INDEX "experience_created_at_idx" ON "experience" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experience_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_experience_id_idx" ON "payload_locked_documents_rels" USING btree ("experience_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "experience_technologies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "experience" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "experience_technologies" CASCADE;
  DROP TABLE "experience" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_experience_fk";
  
  DROP INDEX "payload_locked_documents_rels_experience_id_idx";
  ALTER TABLE "projects" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "experience_id";
  DROP TYPE "public"."enum_experience_icon";
  DROP TYPE "public"."enum_experience_workplace";`)
}
