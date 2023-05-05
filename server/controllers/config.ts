import { Strapi } from '@strapi/strapi';
import { Context } from 'koa';

export default ({ strapi }: { strapi: Strapi }) => ({
  getConfig(ctx: Context) {
    ctx.body = strapi
      .plugin('pagopa-gh-trigger')
      .service('config')
      .getConfig();
  },
});
