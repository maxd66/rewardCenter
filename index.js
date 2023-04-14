const fs = require("fs");
const rewards = JSON.parse(fs.readFileSync("./data/rewards.json"));

function main() {
  console.log("hello world");
  console.log(rewards);
  console.log(rewards.nested.option2);
}

main();
