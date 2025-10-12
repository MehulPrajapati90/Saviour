/*
  Warnings:

  - The values [PDF] on the enum `Media` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Media_new" AS ENUM ('VIDEO', 'IMAGE', 'APPLICATION', 'TEXT', 'AUDIO');
ALTER TABLE "Store" ALTER COLUMN "media_type" TYPE "Media_new" USING ("media_type"::text::"Media_new");
ALTER TYPE "Media" RENAME TO "Media_old";
ALTER TYPE "Media_new" RENAME TO "Media";
DROP TYPE "public"."Media_old";
COMMIT;
