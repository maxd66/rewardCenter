import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "RC",
});

connection.connect(function (err) {
  if (err) throw err;
});

export default connection;
