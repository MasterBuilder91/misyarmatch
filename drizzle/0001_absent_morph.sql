CREATE TABLE `chat_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`senderUserId` int NOT NULL,
	`content` text NOT NULL,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_queue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`gender` enum('brother','sister') NOT NULL,
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_queue_id` PRIMARY KEY(`id`),
	CONSTRAINT `chat_queue_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `chat_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brotherUserId` int NOT NULL,
	`sisterUserId` int NOT NULL,
	`status` enum('active','ended','connected') NOT NULL DEFAULT 'active',
	`brotherRequestedConnect` boolean NOT NULL DEFAULT false,
	`sisterRequestedConnect` boolean NOT NULL DEFAULT false,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`endedAt` timestamp,
	`durationSeconds` int NOT NULL DEFAULT 0,
	CONSTRAINT `chat_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `compatibility_insights` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`matchId` int NOT NULL,
	`insight` text NOT NULL,
	`generatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `compatibility_insights_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `interests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fromUserId` int NOT NULL,
	`toUserId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `interests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brotherUserId` int NOT NULL,
	`sisterUserId` int NOT NULL,
	`matchedAt` timestamp NOT NULL DEFAULT (now()),
	`isActive` boolean NOT NULL DEFAULT true,
	CONSTRAINT `matches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('new_match','new_message','new_interest','system','speed_chat_connect') NOT NULL,
	`title` varchar(200) NOT NULL,
	`body` text,
	`isRead` boolean NOT NULL DEFAULT false,
	`relatedId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripePaymentIntentId` varchar(255),
	`stripeCustomerId` varchar(255),
	`amount` decimal(10,2),
	`currency` varchar(10) DEFAULT 'gbp',
	`status` enum('pending','succeeded','failed','refunded') DEFAULT 'pending',
	`tierPurchased` enum('premium') DEFAULT 'premium',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `private_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` int NOT NULL,
	`senderUserId` int NOT NULL,
	`content` text NOT NULL,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `private_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`gender` enum('brother','sister') NOT NULL,
	`dateOfBirth` timestamp,
	`ageVerified` boolean NOT NULL DEFAULT false,
	`displayName` varchar(100),
	`bio` text,
	`location` varchar(100),
	`country` varchar(100),
	`maritalStatus` enum('never_married','divorced','widowed','married_seeking_second'),
	`currentCircumstances` enum('ready_now','currently_studying','going_through_divorce','already_married_seeking_second','working_abroad','financial_constraints'),
	`misyarIntention` text,
	`occupation` varchar(100),
	`photoUrl` text,
	`photoKey` text,
	`isPhotoPublic` boolean NOT NULL DEFAULT false,
	`isProfileVisible` boolean NOT NULL DEFAULT true,
	`subscriptionTier` enum('free','premium') NOT NULL DEFAULT 'free',
	`premiumExpiresAt` timestamp,
	`dailyChatSecondsUsed` int NOT NULL DEFAULT 0,
	`dailyChatResetAt` timestamp,
	`isImported` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `profiles_userId_unique` UNIQUE(`userId`)
);
