import { Strapi } from '@strapi/strapi';
import { Context } from 'koa';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getRuns(ctx: Context) {
    const response =  await strapi
      .plugin('pagopa-gh-trigger')
      .service('actions')
      .getRuns(ctx.params);
    ctx.body = response.data;
  },
  async startRun(ctx: Context) {
    const response =  await strapi
      .plugin('pagopa-gh-trigger')
      .service('actions')
      .startRun(ctx.params);
    if (response.status >= 300) {
      return ctx.internalServerError(`Server error`);
    }
    ctx.status = response.status
    ctx.body = response.data;
  },
});
