import inquirer from "inquirer";
import DB from "../data/DB.js";

async function spinPrompt() {
  let allRewards = [];
  let reroll;

  const achievementQuestion = [
    {
      type: "input",
      name: "title",
      message: "NICE! What did you accomplish?",
      validate: async function (input) {
        const charNumber = input.split("").length;
        return charNumber > 0 && charNumber < 110
          ? true
          : "Achievement title must be greater than 0 and less than 110 characters.";
      },
    },
  ];

  const achievementPromptResponse = await inquirer.prompt(achievementQuestion);
  const addAchievementResponse = await DB.addAchievement(
    achievementPromptResponse.title
  );

  const removeQuestion = [
    {
      type: "list",
      name: "remove",
      message: "Would you like to remove this reward?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    },
  ];

  const rerollQuestion = [
    {
      type: "list",
      name: "rerollAnswer",
      message: "Roll again?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    },
  ];

  do {
    const dbRequest = await DB.getAllRewards();
    const rewards = dbRequest[0];
    console.log(rewards);
    const random = Math.floor(Math.random() * rewards.length);
    console.log(random);
    const chosenReward = rewards[random];
    console.log(`You rolled ${chosenReward.item}`);
    if (chosenReward.count > 1) {
      console.log(`Nice! You are one roll closer to unlocking this reward!`);
      await DB.updateCount(chosenReward.id);
    } else {
      const removeResponse = await inquirer.prompt(removeQuestion);
      if (removeResponse.remove) {
        await DB.deleteReward(chosenReward.id);
      }
    }
    reroll = chosenReward.rollAgain;
    allRewards.push(chosenReward);
    if (reroll) {
      const rerollResponse = await inquirer.prompt(rerollQuestion);
      if (!rerollResponse.rerollAnswer) {
        reroll = 0;
      }
    }
  } while (reroll);

  for (let i = 0; i < allRewards.length; i++) {
    await DB.addAchieveRewardRelation(
      addAchievementResponse[0].insertId,
      allRewards[i].id
    );
  }
  return allRewards;
}

export default spinPrompt;
