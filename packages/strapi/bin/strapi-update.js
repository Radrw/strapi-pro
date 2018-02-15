#!/usr/bin/env node

'use strict';

/**
 * Module dependencies
 */

// Node.js core.
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

// Public node modules.
const _ = require('lodash');

// Logger.
const logger = require('strapi-utils').logger;

/**
 * `$ strapi update`
 *
 * Pull latest update from custom generators
 * readed from the RC file at $HOME.
 */

module.exports = function () {
  const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

  fs.access(path.resolve(HOME, '.strapirc'), fs.F_OK | fs.R_OK | fs.W_OK, err => {
    if (err) {
      if (err.code === 'ENOENT') {
        logger.error('No `.strapirc` file detected at `' + HOME + '`.');
        logger.error('Execute `$ strapi config` to create one.');
      } else if (err.code === 'EACCES') {
        logger.error('Impossible to access the `.strapirc` file at `' + HOME + '`.');
        logger.error('Please check read/write permissions before execute `$ strapi update`.');
      }
      process.exit(1);
    } else {
      const config = JSON.parse(fs.readFileSync(path.resolve(HOME, '.strapirc')));
      _.forEach(config.generators, (info, name) => {
        try {
          process.chdir(path.resolve(__dirname, '..', 'node_modules', 'strapi-generate-' + name));
          logger.debug('Pulling the latest updates of `strapi-generate-' + name + '`.');
          exec('git pull ' + info.remote + ' ' + info.branch, err => {
            if (err) {
              logger.error('Impossible to update `strapi-generate-' + name + '`.');
            } else {
              logger.info('Successfully updated `strapi-generate-' + name + '`.');
            }
          });
        } catch (err) {
          process.chdir(path.resolve(__dirname, '..', 'node_modules'));
          logger.debug('Cloning the `strapi-generate-' + name + '` repository for the first time...');
          exec('git clone ' + info.repository + ' strapi-generate-' + name, err => {
            if (err) {
              logger.error('Impossible to clone the `strapi-generate-' + name + '` repository.');
              console.log(err);
            } else {
              logger.info('Successfully cloned the `strapi-generate-' + name + '` repository.');
              process.chdir(path.resolve(__dirname, '..', 'node_modules', 'strapi-generate-' + name));
              logger.debug('Installing dependencies for `strapi-generate-' + name + '`...');
              exec('npm install', err => {
                if (err) {
                  logger.error('Impossible to install dependencies for `strapi-generate-' + name + '`.');
                  console.log(err);
                } else {
                  logger.info('Successfully installed dependencies for `strapi-generate-' + name + '`.');
                }
              });
            }
          });
        }
      });
    }
  });
};
