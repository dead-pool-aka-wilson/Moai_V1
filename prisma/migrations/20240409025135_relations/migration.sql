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
CREATE TABLE "meme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "memeId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "creatorId" TEXT,

    CONSTRAINT "meme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "spending" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_spending_key" ON "user"("spending");

-- AddForeignKey
ALTER TABLE "meme" ADD CONSTRAINT "meme_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
