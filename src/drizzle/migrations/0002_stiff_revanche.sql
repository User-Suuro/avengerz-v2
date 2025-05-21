CREATE TABLE `admins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`username` varchar(100) NOT NULL,
	`password` longtext NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`created_by` int,
	CONSTRAINT `admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `admins_email_unique` UNIQUE(`email`),
	CONSTRAINT `admins_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`session_token` varchar(255) NOT NULL,
	`otp` varchar(6) NOT NULL,
	`session_refreshed_date` timestamp NOT NULL DEFAULT (now()),
	`session_validity_date` timestamp NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` DROP FOREIGN KEY `fk_users_created_by`;
--> statement-breakpoint
ALTER TABLE `users` ADD `session_key` int;--> statement-breakpoint
ALTER TABLE `admins` ADD CONSTRAINT `fk_admins_created_by` FOREIGN KEY (`created_by`) REFERENCES `admins`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_session_key_sessions_id_fk` FOREIGN KEY (`session_key`) REFERENCES `sessions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `token`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `position`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `created_by`;