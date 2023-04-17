USE RC;

INSERT INTO achievements(title)
VALUES ("won the battle"), ("won the race"), ("finished the chapter");

INSERT INTO rewards(item, count, rollAgain)
VALUES ("open csgo case 1", 1, 0), ("take a walk", 1, 1), ("3d printer countdown", 5, 0);

INSERT INTO achieve_reward(achievement_id, reward_id)
VALUES (1, 1), (2, 2), (2, 3), (3, 1);