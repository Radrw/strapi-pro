'use strict';

/**
 * Products.js controller
 *
 * @description: A set of functions called "actions" for managing `Products`.
 */

module.exports = {

  /**
   * Retrieve products records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.products.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a products record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.products.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an products record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.products.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an products record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.products.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an products record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.products.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
