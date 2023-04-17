import connection from "./connection.js";

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  getAllRewards() {
    return this.connection.promise().query("SELECT * FROM rewards;");
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
}

export default new DB(connection);
