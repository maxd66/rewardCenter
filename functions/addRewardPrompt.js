import inquirer from "inquirer";
import DB from "../data/DB.js";

async function addRewardPrompt() {
  const addQuestions = [
    {
      type: "input",
      name: "item",
      message: "What reward would you like to add?",
      validate: async function (input) {
        const charNumber = input.split("").length;
        return charNumber > 0 && charNumber < 110
          ? true
          : "Reward item must be greater than 0 and less than 110 characters.";
      },
    },
    {
      type: "input",
      name: "count",
      message: "How many rolls are required to achieve this reward?",
      validate: async function (input) {
        return +input
          ? true
          : "You must input a number and it must be greater than 0.";
      },
    },
    {
      type: "list",
      name: "rollAgain",
      message:
        "Would you like to have the option to roll again after this prize is achieved?",
      choices: [
        { name: "Yes", value: 1 },
        { name: "No", value: 0 },
      ],
    },
  ];
  const addition = await inquirer.prompt(addQuestions);
  const dbResponse = await DB.addReward(
    addition.item,
    addition.count,
    addition.rollAgain
  );
  return dbResponse;
}

export default addRewardPrompt;
