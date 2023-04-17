USE RC;

-- SELECT achievements.title, rewards.item, rewards.count 
-- FROM achieve_reward
-- INNER JOIN rewards ON achieve_reward.reward_id=rewards.id
-- INNER JOIN achievements ON achieve_reward.achievement_id=achievements.id;

INSERT INTO rewards (item, count) VALUES ("breathe some air", 3);