'use strict';

/**
 * stand-up controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::stand-up.stand-up');
