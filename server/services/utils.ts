import getPluginConfig from "../helpers/pluginConfig";
import { Strapi } from '@strapi/strapi';

const buildConfig = (strapi: Strapi) => {
    const pluginConfig = getPluginConfig(strapi);
    return pluginConfig
  };

export default buildConfig;