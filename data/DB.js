import connection from "./connection.js";

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  getAllRewards() {
    return this.connection
      .promise()
      .query("SELECT * FROM rewards WHERE count > 0;");
  }

  getOneReward(id) {
    //needs to be updated to use the id, because in the prompt I will list all rewards to be chosen from and then pass the id to this function.
    return this.connection
      .promise()
      .query("SELECT * FROM rewards WHERE id=?", id);
  }

  addReward(item, count) {
    return this.connection
      .promise()
      .query("INSERT INTO rewards (item, count) VALUES (?, ?)", [item, count]);
  }

  deleteReward(id) {
    //not a true delete, just updating rewards to be removed from reward pool.
    return this.connection
      .promise()
      .query("UPDATE rewards SET count = 0 WHERE id=?", id);
  }

  getAllAchievements() {
    return this.connection
      .promise()
      .query(
        "SELECT achievements.id, achievements.title, rewards.item FROM achieve_reward INNER JOIN rewards ON achieve_reward.reward_id=rewards.id INNER JOIN achievements ON achieve_reward.achievement_id=achievements.id"
      );
  }

  getAchievementsWithoutRewards() {
    return this.connection.promise().query("SELECT * FROM achievements");
  }

  getOneAchievement(id) {
    return this.connection
      .promise()
      .query(
        "SELECT achievements.id, achievements.title, rewards.item FROM achieve_reward INNER JOIN rewards ON achieve_reward.reward_id=rewards.id INNER JOIN achievements ON achieve_reward.achievement_id=achievements.id WHERE achievement_id = ?",
        id
      );
  }

  addAchievement(title) {
    return this.connection
      .promise()
      .query("INSERT INTO achievements (title) VALUES (?)", title);
  }

  addAchieveRewardRelation(achievementId, rewardId) {
    return this.connection
      .promise()
      .query(
        "INSERT INTO achieve_reward (achievement_id, reward_id) VALUES (?, ?)",
        [achievementId, rewardId]
      );
  }

  updateCount(id) {
    return this.connection
      .promise()
      .query("UPDATE rewards SET count = count - 1 WHERE id = ?", id);
  }
}

export default new DB(connection);
