drop table if exists `session_login`.`users`;

create table `session_login`.`users`
(
    `user_id`  varchar(32) not null,
    `name`     varchar(32) not null,
    `password` varchar(32) not null,
    primary key (`user_id`)
);
