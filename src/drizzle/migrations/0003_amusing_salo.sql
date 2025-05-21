ALTER TABLE `users` DROP FOREIGN KEY `users_session_key_sessions_id_fk`;
--> statement-breakpoint
ALTER TABLE `admins` ADD `session_key` int;--> statement-breakpoint
ALTER TABLE `admins` ADD CONSTRAINT `admins_session_key_sessions_id_fk` FOREIGN KEY (`session_key`) REFERENCES `sessions`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_session_key_sessions_id_fk` FOREIGN KEY (`session_key`) REFERENCES `sessions`(`id`) ON DELETE set null ON UPDATE no action;