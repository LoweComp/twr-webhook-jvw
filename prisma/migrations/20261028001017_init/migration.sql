-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transactionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Sale_transactionId_key" ON "Sale"("transactionId");
