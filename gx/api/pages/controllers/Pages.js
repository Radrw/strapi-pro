'use strict';

/**
 * Pages.js controller
 *
 * @description: A set of functions called "actions" for managing `Pages`.
 */

module.exports = {

  /**
   * Retrieve pages records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.pages.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a pages record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.pages.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an pages record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.pages.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an pages record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.pages.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an pages record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.pages.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
