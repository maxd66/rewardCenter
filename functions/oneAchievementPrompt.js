import inquirer from "inquirer";
import DB from "../data/DB.js";

async function oneAchievementPrompt() {
  //haven't tested, this might need to be refactored to async await to avoid nested promises.
  const achievements = await DB.getAchievementsWithoutRewards();
  const promptChoices = achievements[0].map((achievement) => {
    return {
      name: achievement.title,
      value: achievement.id,
    };
  });
  const question = [
    {
      type: "list",
      name: "achievementChoice",
      message: "Select an Achievement:",
      choices: promptChoices,
    },
  ];

  const response = await inquirer.prompt(question);
  const chosenAchievement = await DB.getOneAchievement(
    response.achievementChoice
  );
  return chosenAchievement[0];
}

export default oneAchievementPrompt;
