'use strict';

/**
 * Zit.js controller
 *
 * @description: A set of functions called "actions" for managing `Zit`.
 */

module.exports = {

  /**
   * Retrieve zit records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.zit.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a zit record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.zit.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an zit record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.zit.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an zit record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.zit.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an zit record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.zit.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
