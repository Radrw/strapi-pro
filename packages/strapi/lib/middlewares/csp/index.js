'use strict';

/**
 * Module dependencies
 */

/**
 * CSP hook
 */

module.exports = strapi => {
  return {
    /**
     * Initialize the hook
     */

    initialize: function(cb) {
      strapi.app.use(
        async (ctx, next) => {
          if (ctx.request.admin) return await next();

          return await strapi.koaMiddlewares.convert(
            strapi.koaMiddlewares.lusca.csp(strapi.config.middleware.settings.csp)
          )(ctx, next);
        }
      );

      cb();
    }
  };
};
