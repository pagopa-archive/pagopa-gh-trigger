import { Strapi } from '@strapi/strapi';
import buildConfig from "./utils";
import  fetch  from "node-fetch";

const commonHeaderParams = {
  "Accept": "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28"
};
function toConfigObj(config: []):{} {
  return config.reduce(
    (obj:any, item: any) => {obj[item.id] = item
      return obj}, {});
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async getRuns(params: any) {
    const config = buildConfig(strapi);
    const configObj: any = toConfigObj(config);

    if (!(params.id in configObj)) { return { data: {}} };

    const configEnv = configObj[params.id];
    const url: string = `https://api.github.com/repos/${configEnv.ghOrg}/${configEnv.ghRepo}/actions/workflows/${configEnv.ghWorflowFile}/runs?per_page=3`;
    const headerParams: {} = {
      "Authorization": `token ${configEnv.ghToken}`,
      ...commonHeaderParams
    };
    const responseFromGH = await fetch( url, {
      headers: headerParams
      });
    if (!responseFromGH.ok) {
      const message = {"error": `An error occurred; ${responseFromGH.status}`};
      return {
        "error": message,
        "data": {},
        "status": responseFromGH.status
      }
    }
    const data = await responseFromGH.json()
    return {"data": data};
  },
  async startRun(params:any) {
    const config = buildConfig(strapi);
    const configObj:any = toConfigObj(config);

    if (!(params.id in configObj)) { return { data: {}} };

    const configEnv = configObj[params.id];
    const url: string = `https://api.github.com/repos/${configEnv.ghOrg}/${configEnv.ghRepo}/dispatches`;
    const body: {} = {"event_type": configEnv.eventType};
    const headerParams: {} = {
      "Authorization": `token ${configEnv.ghToken}`,
      "User-agent": configEnv.userAgent,
      ...commonHeaderParams
    };
    const responseFromGH = await fetch( url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headerParams
      });
    if (!responseFromGH.ok) {
        const message = {"error": `An error occurred; ${responseFromGH.status}`};
        return {
          "error": message,
          "data": {},
          "status": responseFromGH.status
        }
      }
    return {
      data: { "message": "run"},
      status: responseFromGH.status
    };

  },
});
