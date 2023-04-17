//NOT A TRUE DELETE, allowing for the deletion of rewards would cause problems with relationships.
//This delete functionality simply removes a certain reward from the pool of active rewards.

import inquirer from "inquirer";
import DB from "../data/DB.js";

async function deleteRewardPrompt() {
  const rewards = await DB.getAllRewards();
  const promptChoices = rewards[0].map((reward) => {
    return {
      name: reward.item,
      value: reward.id,
    };
  });
  const question = [
    {
      type: "list",
      name: "deleteChoice",
      message: "Select a reward to be deleted:",
      choices: promptChoices,
    },
  ];

  const response = await inquirer.prompt(question);
  const deletedReward = await DB.deleteReward(response.deleteChoice);
  return deletedReward[0];
}

export default deleteRewardPrompt;
