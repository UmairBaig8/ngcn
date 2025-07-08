#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const CONFIG_FILENAME = '.ngcn.json';

const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesRoot = path.join(__dirname, '../templates');

function loadUserConfig() {
  const configPath = path.join(process.cwd(), CONFIG_FILENAME);
  if (fs.existsSync(configPath)) {
    try {
      const data = fs.readFileSync(configPath, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error(`⚠️ Error parsing .my-angular-ui-cli.json`);
      console.error(e);
    }
  }
  return {};
}

function replaceTemplateVariables(content, variables) {
  return content.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return variables[key] || '';
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str) {
  return str
    .split(/[-_\s]/g)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}


async function addComponent(componentName, options) {
  const userConfig = loadUserConfig();

  // Determine theme
  let theme = options.theme || userConfig.theme;

  // Determine standalone flag
  let isStandalone = options.standalone !== undefined
    ? options.standalone
    : userConfig.standalone ?? false;

  // Determine target path
  let targetBase = userConfig.targetPath || 'src/app/ui';

  // Prompt if no theme yet
  if (!theme) {
    const availableThemes = fs.readdirSync(templatesRoot);
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'theme',
        message: 'Which theme do you want?',
        choices: availableThemes
      }
    ]);
    theme = answers.theme;
  }

  const componentPath = path.join(templatesRoot, theme, componentName);
  if (!fs.existsSync(componentPath)) {
    console.error(`❌ Component '${componentName}' not found for theme '${theme}'.`);
    process.exit(1);
  }

  const targetPath = path.join(process.cwd(), targetBase, componentName);
  fs.mkdirSync(targetPath, { recursive: true });

  const standaloneFlag = isStandalone ? 'standalone: true,' : '';

  for (const file of fs.readdirSync(componentPath)) {
    const srcFile = path.join(componentPath, file);
    const destFile = path.join(targetPath, file);

    const content = fs.readFileSync(srcFile, 'utf-8');
    const replaced = replaceTemplateVariables(content, {
      name: componentName.toLowerCase(),
      ComponentName: toPascalCase(componentName),
      StandaloneFlag: standaloneFlag
    });

    fs.writeFileSync(destFile, replaced);
  }

  console.log(`✅ Added '${componentName}' to ${targetBase}/${componentName}`);
}


program
  .command('add <component>')
  .description('Add a UI component to your Angular project')
  .option('-t, --theme <theme>', 'Theme to use')
  .option('-s, --standalone', 'Use standalone component flag')
  .action(addComponent);


program.parse(process.argv);
