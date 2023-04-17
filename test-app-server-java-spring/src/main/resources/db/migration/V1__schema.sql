CREATE TABLE `users`
(
    `id`         bigint(20)   NOT NULL AUTO_INCREMENT,
    `name`       varchar(40)  NOT NULL,
    `username`   varchar(15)  NOT NULL,
    `email`      varchar(40)  NOT NULL,
    `password`   varchar(100) NOT NULL,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_users_username` (`username`),
    UNIQUE KEY `uk_users_email` (`email`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


CREATE TABLE `roles`
(
    `id`   bigint(20)  NOT NULL AUTO_INCREMENT,
    `name` varchar(60) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_roles_name` (`name`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8;


CREATE TABLE `user_roles`
(
    `user_id` bigint(20) NOT NULL,
    `role_id` bigint(20) NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    KEY `fk_user_roles_role_id` (`role_id`),
    CONSTRAINT `fk_user_roles_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
    CONSTRAINT `fk_user_roles_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


CREATE TABLE `students`
(
    `id`          bigint(20)  NOT NULL AUTO_INCREMENT,
    `first_name`  varchar(40) NOT NULL,
    `family_name` varchar(40) NOT NULL,
    `dob`         DATE DEFAULT NULL,
    `created_at`  timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)

) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `courses`
(
    `id`          bigint(20)  NOT NULL AUTO_INCREMENT,
    `name`        varchar(40) NOT NULL,
    `created_at`  timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)

) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `results`
(
    `id`          bigint(20)  NOT NULL AUTO_INCREMENT,
    `student_id`  bigint(20) NOT NULL,
    `course_id`   bigint(20) NOT NULL,
    `score`       enum ('A', 'B', 'C', 'D', 'E', 'F'),
    `created_at`  timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`student_id`, `course_id`),
    CONSTRAINT `fk_results_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
    CONSTRAINT `fk_results_course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)

) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

