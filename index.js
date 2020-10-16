const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// questions for User
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "gitname",
      message: "What is your GitHub username?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      type: "input",
      name: "project",
      message: "What is your project name?",
    },
    {
      type: "input",
      name: "description",
      message: "Please write a short description of your project.",
    },
    {
      type: "list",
      name: "license",
      message: "What kind of license should your project have?",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
    },
    {
      type: "input",
      name: "dependencies",
      message: "What command should be entered to install dependencies?",
    },
    {
      type: "input",
      name: "tests",
      message: "What command should be entered to run tests?",
    },
    {
      type: "input",
      name: "usage",
      message: "What does the user need to know about using the repo?",
    },
    {
      type: "input",
      name: "contributing",
      message:
        "What does the user need to know about contributing to the repo?",
    },
  ]);
}

const licenseBadge = {
  MIT: "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)",
  "APACHE 2.0":
    "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)",
  "GPL 3.0":
    "![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)",
  "BSD 3":
    "![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)",
  None:
    "![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)",
};

function generateREADME(answers) {
  return `
  ## ${answers.project}
  ----
  ${licenseBadge[answers.license]}
  
  ## 🧑‍💻 Description
  ${answers.description}
  
  ## Table of Contents
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [License](#License)
  - [Contributing](#Contributing)
  - [Tests](#Tests)
  - [Questions](#Questions)
 
  ## Installation
  To install necessary dependencies, run the following command:
    
    ${answers.dependencies} 
  
  ## Usage
  ${answers.usage}
 
  ## License
  The project is licensed under the ${answers.license} license.
  
  ## Contributing
  ${answers.contributing}
 
  ## Tests
  To run tests, run the following command:
      
    ${answers.tests}

  ## ❔ Questions
  If you have any questions about the repo, open an issue or contact me directly at ${
    answers.email
  }. You can find more of my work at [${answers.gitname}/](https://github.com/${
    answers.gitname
  }).
  `;
}

async function init() {
  try {
    const answers = await promptUser();

    const readme = generateREADME(answers);

    await writeFileAsync("README.md", readme, "utf8");
    console.log("Generating README.md file...");
  } catch (err) {
    console.log(err);
  }
}

// I will need to read file to find out what license the user has chosen in their Q's and then allocate badge?
// license from inquirer - replace link with correct licence
// create a global array of objects that contains a title MIT etc, and another key link to the image

init();
