'use strict';

/**
 * stand-up service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stand-up.stand-up');
