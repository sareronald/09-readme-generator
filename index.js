const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

inquirer.prompt([
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
    name: "description",
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
    name: "repo",
    message: "What does the user need to know about using the repo?",
  },
  {
    type: "input",
    name: "contributing",
    message: "What does the user need to know about contributing to the repo?",
  },
]);
