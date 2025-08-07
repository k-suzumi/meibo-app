-- CreateTable
CREATE TABLE `Person` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `job` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hobby` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonHobby` (
    `personId` INTEGER NOT NULL,
    `hobbyId` INTEGER NOT NULL,

    PRIMARY KEY (`personId`, `hobbyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PersonHobby` ADD CONSTRAINT `PersonHobby_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonHobby` ADD CONSTRAINT `PersonHobby_hobbyId_fkey` FOREIGN KEY (`hobbyId`) REFERENCES `Hobby`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
