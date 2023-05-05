import { Strapi } from '@strapi/strapi';
import { Context } from 'koa';

const checkConfigRoles = (policyContext: Context, _: any) => {
        const configRoles = ["strapi-editor", "strapi-super-admin"];
        const userRoles = policyContext.state.user.roles;
        const hasRole = userRoles.find((r: any) => configRoles.includes(r.code));
        if (hasRole) {
          return true;
        }
        return false;
      };

export default checkConfigRoles;