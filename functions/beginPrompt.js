import inquirer from "inquirer";
import DB from "../data/DB.js";
import check from "./checkPrompt.js";
import oneRewardPrompt from "./oneRewardPrompt.js";

const initialQuestion = [
  {
    type: "list",
    name: "initial",
    message: "What would you like to do?",
    choices: [
      { name: "Spin Wheel", value: "spin" },
      { name: "Add Reward", value: "addReward" },
      { name: "Remove Reward", value: "removeReward" },
      { name: "Get all Rewards", value: "getAllRewards" },
      { name: "Get a specific Reward", value: "getOneReward" },
      { name: "Get All Achievements", value: "getAllAchievements" },
      { name: "Get One Achievement", value: "getOneAchievement" },
    ],
  },
];

// const checkQuestion = [
//   {
//     type: "list",
//     name: "check",
//     message: "Would you like to do anything else?",
//     choices: ["Yes", "No"],
//   },
// ];

function beginPrompt() {
  inquirer
    .prompt(initialQuestion)
    .then((response) => {
      switch (response.initial) {
        case "spin":
          console.log("selected choice spin");
          break;

        case "addReward":
          console.log("selected choice add");

          break;

        case "removeReward":
          console.log("selected choice remove");

          break;

        case "getAllRewards":
          DB.getAllRewards().then(([rows]) => {
            const rewards = rows;
            console.log("\n");
            console.table(rewards);
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

        case "findAllAchievements":
          console.log("selected choice findAllAchievements");

          break;
        case "findOneAchievement":
          console.log("selected choice findOneAchievements");

          break;

        default:
          break;
      }
    })
    .catch((err) => console.log(err));
}

// function check() {
//   inquirer.prompt(checkQuestion).then((response) => {
//     switch (response.check) {
//       case "Yes":
//         beginPrompt();
//         break;

//       case "No":
//         process.exit(0);
//         break;
//     }
//   });
// }

export default beginPrompt;
