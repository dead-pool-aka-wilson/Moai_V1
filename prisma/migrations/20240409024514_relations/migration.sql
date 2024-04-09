/*
  Warnings:

  - You are about to drop the `Meme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meme" DROP CONSTRAINT "Meme_creatorId_fkey";

-- DropTable
DROP TABLE "Meme";

-- DropTable
DROP TABLE "User";

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

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "spending" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_spending_key" ON "users"("spending");

-- AddForeignKey
ALTER TABLE "memes" ADD CONSTRAINT "memes_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
