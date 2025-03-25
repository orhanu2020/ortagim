-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT
);

-- CreateTable
CREATE TABLE "Home" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "guests" TEXT,
    "bedrooms" TEXT,
    "bathrooms" TEXT,
    "country" TEXT,
    "photo" TEXT,
    "price" INTEGER,
    "categoryName" TEXT,
    "addedCategory" BOOLEAN NOT NULL DEFAULT false,
    "addedDescription" BOOLEAN NOT NULL DEFAULT false,
    "addedLoaction" BOOLEAN NOT NULL DEFAULT false,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Home_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "homeId" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Favorite_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "homeId" TEXT,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Reservation_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Neighborhood" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_HomeToNeighborhood" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_HomeToNeighborhood_A_fkey" FOREIGN KEY ("A") REFERENCES "Home" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_HomeToNeighborhood_B_fkey" FOREIGN KEY ("B") REFERENCES "Neighborhood" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_HomeToNeighborhood_AB_unique" ON "_HomeToNeighborhood"("A", "B");

-- CreateIndex
CREATE INDEX "_HomeToNeighborhood_B_index" ON "_HomeToNeighborhood"("B");
