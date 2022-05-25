import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
import { getCacheValue, setCacheValue } from "./cache";

const octokit = new Octokit({
  auth: process.env.API_GITHUB,
  userAgent: "littletealeaf.github.io v0.1.0",
});


export const GitHubAPI = {
  repos: {
    get: async (params: RestEndpointMethodTypes["repos"]["get"]["parameters"]): Promise<RestEndpointMethodTypes["repos"]["get"]["response"]["data"]> =>
      handle(["repos", "get"], params, octokit.repos.get),
    listLanguages: async (params: RestEndpointMethodTypes["repos"]["listLanguages"]["parameters"]): Promise<{[key: string]: number}> => handle(["repos","listLanguages"], params, octokit.repos.listLanguages),
  },
  users: {
    getByUsername: async (params: RestEndpointMethodTypes["users"]["getByUsername"]["parameters"]): Promise<RestEndpointMethodTypes["users"]["getByUsername"]["response"]["data"]> =>
      handle(["users", "getByUsername"], params, octokit.users.getByUsername),
  },
  activity: {
    listPublicEventsForUser: async (
      params: RestEndpointMethodTypes["activity"]["listPublicEventsForUser"]["parameters"]
    ): Promise<RestEndpointMethodTypes["activity"]["listPublicEventsForUser"]["response"]["data"]> => handle(["activity", "listPublicEventsForUser"], params, octokit.activity.listPublicEventsForUser),
  },
};

const handle = async <ParamType, ResultType>(
  type: Array<string>,
  params: ParamType,
  callback: (params: ParamType) => Promise<{
    data: ResultType;
  }>
): Promise<ResultType> => {
  const cache: ResultType = getCacheValue(type, params);
  if (cache != null) {
    return cache;
  } else {
    const value: ResultType = await callback(params).then((item) => item.data);
    setCacheValue(type, params, value);
    return value;
  }
};
