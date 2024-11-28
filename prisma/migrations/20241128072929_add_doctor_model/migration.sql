/*
  Warnings:

  - Made the column `contactNumber` on table `doctors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `registrationNumber` on table `doctors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentWorkingPlace` on table `doctors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `designation` on table `doctors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "contactNumber" SET NOT NULL,
ALTER COLUMN "registrationNumber" SET NOT NULL,
ALTER COLUMN "experience" SET DEFAULT 0,
ALTER COLUMN "currentWorkingPlace" SET NOT NULL,
ALTER COLUMN "designation" SET NOT NULL;
