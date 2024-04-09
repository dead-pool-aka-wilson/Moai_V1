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
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "spending" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_spending_key" ON "users"("spending");

-- AddForeignKey
ALTER TABLE "Meme" ADD CONSTRAINT "Meme_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
