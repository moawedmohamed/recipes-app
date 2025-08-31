/*
  Warnings:

  - A unique constraint covering the columns `[recipeId,userId]` on the table `favoriteRecipes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `favoriteRecipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."favoriteRecipes_recipeId_key";

-- AlterTable
ALTER TABLE "public"."favoriteRecipes" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "favoriteRecipes_recipeId_userId_key" ON "public"."favoriteRecipes"("recipeId", "userId");

-- AddForeignKey
ALTER TABLE "public"."favoriteRecipes" ADD CONSTRAINT "favoriteRecipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
