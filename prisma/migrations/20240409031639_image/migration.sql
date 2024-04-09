/*
  Warnings:

  - You are about to drop the `memes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "memes" DROP CONSTRAINT "memes_creatorId_fkey";

-- DropTable
DROP TABLE "memes";

-- CreateTable
CREATE TABLE "meme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "memeId" TEXT NOT NULL,
    "imageUri" TEXT NOT NULL,
    "creatorId" TEXT,

    CONSTRAINT "meme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "meme" ADD CONSTRAINT "meme_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
