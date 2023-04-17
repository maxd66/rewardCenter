import inquirer from "inquirer";
import DB from "../data/DB.js";
import check from "./checkPrompt.js";
import oneRewardPrompt from "./oneRewardPrompt.js";
import addRewardPrompt from "./addRewardPrompt.js";
import deleteRewardPrompt from "./deleteRewardPrompt.js";
import oneAchievementPrompt from "./oneAchievementPrompt.js";
import spinPrompt from "./spinPrompt.js";

const initialQuestion = [
  {
    type: "list",
    name: "initial",
    message: "What would you like to do?",
    choices: [
      { name: "Spin Wheel", value: "spin" },
      { name: "Add a Reward", value: "addReward" },
      { name: "Delete a Reward", value: "deleteReward" },
      { name: "Get all Rewards", value: "getAllRewards" },
      { name: "Get a specific Reward", value: "getOneReward" },
      { name: "Get All Achievements", value: "getAllAchievements" },
      { name: "Get One Achievement", value: "getOneAchievement" },
    ],
  },
];

function beginPrompt() {
  inquirer
    .prompt(initialQuestion)
    .then((response) => {
      switch (response.initial) {
        case "spin":
          spinPrompt().then((response) => {
            check();
          });
          break;

        case "addReward":
          addRewardPrompt().then((addResponse) => {
            if (addResponse[0].insertId) {
              console.log("\n");
              console.log(
                `Hooray! Your reward has been added with the id ${addResponse[0].insertId}`
              );
            } else {
              console.log("\n");
              console.log(
                "Oops! It looks like something may have gone wrong. Check the rewards list to see if it has been updated."
              );
            }
            check();
          });
          break;

        case "deleteReward":
          deleteRewardPrompt().then((response) => {
            if (response.affectedRows === 1) {
              console.log("\n");
              console.log("You have successfully deleted a reward.");
            } else {
              console.log("\n");
              console.log(
                "Oops! It looks like something may have gone wrong. Check the rewards list to see if it has been updated."
              );
            }
            check();
          });
          break;

        case "getAllRewards":
          DB.getAllRewards().then(([rows]) => {
            const rewards = rows;
            const readableRewards = rows.map((element) => {
              if (element.rollAgain) {
                element.rollAgain = "Yes";
                return element;
              } else {
                element.rollAgain = "No";
                return element;
              }
            });
            console.log("\n");
            console.table(readableRewards);
            check();
          });
          break;

        case "getOneReward":
          oneRewardPrompt().then((chosenReward) => {
            console.log("\n");
            console.table(chosenReward);
            check();
          });

          break;

        case "getAllAchievements":
          DB.getAllAchievements().then(([rows]) => {
            const achievements = rows;
            console.log("\n");
            console.table(achievements);
            check();
          });
          break;
        case "getOneAchievement":
          oneAchievementPrompt().then((chosenAchievement) => {
            console.log("\n");
            console.table(chosenAchievement);
            check();
          });
          break;

        default:
          break;
      }
    })
    .catch((err) => console.log(err));
}

export default beginPrompt;
