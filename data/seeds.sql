USE RC;

INSERT INTO achievements(title)
VALUES ("won the battle"), ("won the race"), ("finished the chapter");

INSERT INTO rewards(item, count)
VALUES ("open csgo case 1", 1), ("take a walk", 1), ("3d printer countdown", 5);

INSERT INTO achieve_reward(achievement_id, reward_id)
VALUES (1, 1), (2, 2), (2, 3), (3, 1);