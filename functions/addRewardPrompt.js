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
  ];
  const addition = await inquirer.prompt(addQuestions);
  const dbResponse = await DB.addReward(addition.item, addition.count);
  return dbResponse;
}

export default addRewardPrompt;
