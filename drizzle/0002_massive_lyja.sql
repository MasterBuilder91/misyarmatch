ALTER TABLE `payments` MODIFY COLUMN `tierPurchased` enum('premium','vip') DEFAULT 'premium';--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `subscriptionTier` enum('free','premium','vip') NOT NULL DEFAULT 'free';--> statement-breakpoint
ALTER TABLE `profiles` ADD `invisibleMode` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `hideFromSearch` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `isVerified` boolean DEFAULT false NOT NULL;