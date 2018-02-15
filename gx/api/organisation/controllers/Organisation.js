'use strict';

/**
 * Organisation.js controller
 *
 * @description: A set of functions called "actions" for managing `Organisation`.
 */

module.exports = {

  /**
   * Retrieve organisation records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.organisation.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a organisation record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.organisation.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an organisation record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.organisation.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an organisation record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.organisation.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an organisation record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.organisation.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
