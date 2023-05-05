import pluginId from "./pluginId";
import { Strapi } from '@strapi/strapi';

const getPluginConfig = (strapi: Strapi) => {
    return strapi.plugin(pluginId).config('enviroments');
  };

export default getPluginConfig;