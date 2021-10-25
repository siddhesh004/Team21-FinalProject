create table referee (referee_id int primary key auto_increment, ref_name char(50), age int, grade int, skill int);

create table game ( game_id int primary key, field_name char(50), game_time datetime);

create table assignment (referee_id int, game_id int ,status char(50),primary key(referee_id,game_id), FOREIGN KEY (referee_id) REFERENCES referee(referee_id),
FOREIGN KEY (game_id) REFERENCES game(game_id));


-- Dummy Data

INSERT INTO referee values (1000, "Martin Atkinson", 55, 2, 90);
INSERT INTO referee values (1001, "Anthony Taylor", 45, 3, 82);
INSERT INTO referee values (1002, "Michael Oliver", 39, 2, 88);
INSERT INTO referee values (1003, "Mike Dean", 57, 1, 95);
INSERT INTO referee values (1004, "Paul Tierney", 47, 4, 77);

INSERT INTO game values (100, "Anfield","01/01/21 23:59:59");
INSERT INTO game values (101, "Stamford Bridge","21/07/13 11:00:00");
INSERT INTO game values (102, "Old Trafford","21/08/15 20:30:00");
INSERT INTO game values (103, "Camp Nou","21/09/06 16:45:00");

INSERT INTO assignment values (1001, 101, "Assigned");
INSERT INTO assignment values (1002, 101, "Assigned");
INSERT INTO assignment values (1003, 101, "Assigned");
INSERT INTO assignment values (1003, 102, "Assigned");
INSERT INTO assignment values (1004, 102, "Assigned");
INSERT INTO assignment values (1001, 103, "Assigned");
INSERT INTO assignment values (1002, 103, "Assigned");
INSERT INTO assignment values (1004, 103, "Assigned");
