'use strict';

/**
 * question-category service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::question-category.question-category');
