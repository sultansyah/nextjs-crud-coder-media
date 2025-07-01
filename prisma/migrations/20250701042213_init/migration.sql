/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "CreatedAt",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
