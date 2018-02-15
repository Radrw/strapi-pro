'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');

/**
 * This `before` function is run before generating targets.
 * Validate, configure defaults, get extra dependencies, etc.
 *
 * @param {Object} scope
 * @param {Function} cb
 */

module.exports = (scope, cb) => {
  if (!scope.rootPath || !scope.id) {
    return cb.invalid('Usage: `$ strapi generate:plugin pluginName`');
  }

  // `scope.args` are the raw command line arguments.
  _.defaults(scope, {
    id: _.trim(_.deburr(scope.id))
  });

  // Determine default values based on the available scope.
  _.defaults(scope, {
    globalID: _.upperFirst(_.camelCase(scope.id)),
    ext: '.js'
  });

  // Plugin info.
  _.defaults(scope, {
    name: scope.args.name || scope.id,
    author: scope.author || 'A Strapi developer',
    email: scope.email || '',
    year: (new Date()).getFullYear(),
    license: 'MIT'
  });

  // Take another pass to take advantage of the defaults absorbed in previous passes.
  _.defaults(scope, {
    filename: `${scope.globalID}${scope.ext}`
  });

  // Humanize output.
  _.defaults(scope, {
    humanizeId: scope.id.toLowerCase(),
    humanizedPath: '`./plugins`'
  });

  // Copy the admin files.
  fs.copySync(path.resolve(__dirname, '..', 'files'), path.resolve(scope.rootPath, 'plugins', scope.humanizeId));

  // Trigger callback with no error to proceed.
  return cb.success();
};
