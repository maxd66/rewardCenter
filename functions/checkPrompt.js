import inquirer from "inquirer";
import beginPrompt from "./beginPrompt.js";

const checkQuestion = [
  {
    type: "list",
    name: "check",
    message: "Would you like to do anything else?",
    choices: ["Yes", "No"],
  },
];

function check() {
  inquirer.prompt(checkQuestion).then((response) => {
    switch (response.check) {
      case "Yes":
        beginPrompt();
        break;

      case "No":
        process.exit(0);
        break;
    }
  });
}

export default check;
