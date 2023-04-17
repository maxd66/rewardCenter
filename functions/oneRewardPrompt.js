import inquirer from "inquirer";
import DB from "../data/DB.js";

async function oneRewardPrompt() {
  //haven't tested, this might need to be refactored to async await to avoid nested promises.
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
      name: "rewardChoice",
      message: "Select a reward:",
      choices: promptChoices,
    },
  ];

  const response = await inquirer.prompt(question);
  const chosenReward = await DB.getOneReward(response.rewardChoice);
  return chosenReward[0];
}

export default oneRewardPrompt;
