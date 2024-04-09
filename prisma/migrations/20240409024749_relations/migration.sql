/*
  Warnings:

  - You are about to drop the `memes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "memes" DROP CONSTRAINT "memes_creatorId_fkey";

-- DropTable
DROP TABLE "memes";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Meme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "memeId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Meme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "spending" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_spending_key" ON "User"("spending");

-- AddForeignKey
ALTER TABLE "Meme" ADD CONSTRAINT "Meme_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
