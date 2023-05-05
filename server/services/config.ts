import { Strapi } from '@strapi/strapi';
import buildConfig from "./utils";

export default ({ strapi }: { strapi: Strapi }) => ({
  getConfig() {
    return {
      data: buildConfig(strapi),
    };
  },
});
