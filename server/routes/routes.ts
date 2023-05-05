import pluginId from "../helpers/pluginId";

const routes = {
    // accessible only from admin UI
  type: 'admin',
  routes: [
    {
        method: 'GET',
        path: '/config',
        handler: 'config.getConfig',
        config: {
          policies: [`plugin::${pluginId}.checkConfigRoles`],
        },
      },
      {
        method: 'GET',
        path: '/runs/:id',
        handler: 'actions.getRuns',
        config: {
          policies: [`plugin::${pluginId}.checkConfigRoles`],
        },
      },
      {
        method: 'POST',
        path: '/run/:id',
        handler: 'actions.startRun',
        config: {
          policies: [`plugin::${pluginId}.checkConfigRoles`],
        },
      },
  ],
}

export default routes;