-- DropForeignKey
ALTER TABLE "Meme" DROP CONSTRAINT "Meme_creatorId_fkey";

-- AlterTable
ALTER TABLE "Meme" ALTER COLUMN "creatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Meme" ADD CONSTRAINT "Meme_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
