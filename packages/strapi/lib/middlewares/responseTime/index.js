'use strict';

/**
 * X-Response-Time hook
 */

module.exports = strapi => {
  return {
    /**
     * Initialize the hook
     */

    initialize: function(cb) {
      strapi.app.use(async (ctx, next) => {
        const start = Date.now();

        await next();

        const delta = Math.ceil(Date.now() - start);

        ctx.set('X-Response-Time', delta + 'ms');
      });

      cb();
    }
  };
};
