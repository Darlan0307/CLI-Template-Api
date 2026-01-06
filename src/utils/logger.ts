import chalk from 'chalk';
import type { Logger } from '../types/index.js';

export const logger: Logger = {
  info: (message: string): void => {
    console.log(chalk.blue(message));
  },

  success: (message: string): void => {
    console.log(chalk.green(message));
  },

  warn: (message: string): void => {
    console.log(chalk.yellow(message));
  },

  error: (message: string): void => {
    console.error(chalk.red(message));
  },

  infoFolders: (message: string): void => {
    console.log(chalk.cyan(message));
  },

  debug: (message: string): void => {
    if (process.env.DEBUG) {
      console.log(chalk.gray(`[DEBUG] ${message}`));
    }
  },
};
