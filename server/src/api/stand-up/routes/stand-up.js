'use strict';

/**
 * stand-up router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::stand-up.stand-up');
