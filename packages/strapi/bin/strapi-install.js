#!/usr/bin/env node

'use strict';

/**
 * Module dependencies
 */

// Node.js core.
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Logger.
const { cli, logger } = require('strapi-utils');

/**
 * `$ strapi install`
 *
 * Install a Strapi plugin.
 */

module.exports = function (plugin, cliArguments) {
  // Define variables.
  const pluginPrefix = 'strapi-plugin-';
  const pluginID = `${pluginPrefix}${plugin}`;
  const pluginPath = `./plugins/${plugin}`;

  // Check that we're in a valid Strapi project.
  if (!cli.isStrapiApp()) {
    return logger.error('This command can only be used inside a Strapi project.');
  }

  // Check that the plugin is not installed yet.
  if (fs.existsSync(pluginPath)) {
    logger.error(`It looks like this plugin is already installed. Please check in \`${pluginPath}\`.`);
    process.exit(1);
  }

  // Progress message.
  logger.debug('Installation in progress...');

  if (cliArguments.dev) {
    try {
      fs.symlinkSync(path.resolve(__dirname, '..', '..', pluginID), path.resolve(process.cwd(), pluginPath), 'dir');

      logger.info('The plugin has been successfully installed.');
      process.exit(0);
    } catch (e) {
      logger.error('An error occurred during plugin installation.');
      process.exit(1);
    }
  } else {
    // Debug message.
    logger.debug('Installing the plugin from npm registry.');

    // Install the plugin from the npm registry.
    exec(`npm install ${pluginID}@alpha --ignore-scripts --no-save --prefix ${pluginPath}`, (err) => {
      if (err) {
        logger.error(`An error occurred during plugin installation. \nPlease make sure this plugin is available on npm: https://www.npmjs.com/package/${pluginID}`);
        process.exit(1);
      }

      // Debug message.
      logger.debug('Plugin successfully installed from npm registry.');

      try {
        // Debug message.
        logger.debug(`Moving the \`node_modules/${pluginID}\` folder to the \`./plugins\` folder.`);

        // Move the plugin from the `node_modules` folder to the `./plugins` folder.
        fs.copySync(`${pluginPath}/node_modules/${pluginID}`, pluginPath);

        // Copy .gitignore because the file is ignored during `npm publish`
        // and we need it to build the plugin.
        try {
          fs.accessSync(path.join(pluginPath, '.gitignore'))
        } catch (err) {
          if (err.code === 'ENOENT') {
            if (process.mainModule.filename.indexOf('yarn') !== -1) {
              fs.copySync(path.resolve(__dirname, '..', '..', 'strapi-generate-plugin', 'templates', 'gitignore'), path.join(pluginPath, '.gitignore'));
            } else {
              fs.copySync(path.resolve(__dirname, '..', 'node_modules', 'strapi-generate-plugin', 'templates', 'gitignore'), path.join(pluginPath, '.gitignore'));
            }
          }
        }

        // Success.
        logger.info('The plugin has been successfully installed.');
        process.exit(0);
      } catch (err) {
        logger.error('An error occurred during plugin installation.');
        process.exit(1);
      }
    });
  }
};
