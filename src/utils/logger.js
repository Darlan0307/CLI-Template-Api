import chalk from "chalk";

export const logger = {
  info: (message) => {
    console.log(chalk.blue(message));
  },

  success: (message) => {
    console.log(chalk.green(`${message}`));
  },

  warn: (message) => {
    console.log(chalk.yellow(`${message}`));
  },

  error: (message) => {
    console.error(chalk.red(`${message}`));
  },

  infoFolders: (message) => {
    console.log(chalk.cyan(`${message}`));
  },

  debug: (message) => {
    if (process.env.DEBUG) {
      console.log(chalk.gray(`[DEBUG] ${message}`));
    }
  },
};
