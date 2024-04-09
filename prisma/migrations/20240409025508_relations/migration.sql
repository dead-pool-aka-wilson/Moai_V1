/*
  Warnings:

  - You are about to drop the `meme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "meme" DROP CONSTRAINT "meme_creatorId_fkey";

-- DropTable
DROP TABLE "meme";

-- CreateTable
CREATE TABLE "memes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "memeId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "creatorId" TEXT,

    CONSTRAINT "memes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "memes" ADD CONSTRAINT "memes_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
