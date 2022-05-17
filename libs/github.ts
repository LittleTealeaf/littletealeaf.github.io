import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
import { RequestParameters } from "@octokit/types";
import { getCache, setCache } from "./cache";

const octokit = new Octokit({
  auth: process.env.API_GITHUB,
  userAgent: "littletealeaf.github.io v0.1.0",
});

const handle = async (type: Array<string>, params: Object, fallback: Function) => {
  const cache = getCache(type, params);
  if (cache != null) {
    return cache;
  } else {
    console.log("HELLO");
    const value = await fallback();
    setCache(type, params, value);
    return value;
  }
};

export const githubClient = {
  repos: {
    get: async (params: RestEndpointMethodTypes["repos"]["get"]["parameters"]): Promise<RestEndpointMethodTypes["repos"]["get"]["response"]> =>
      handle(["repos", "get"], params, () => octokit.repos.get(params)),
  },
  users: {
    getByUsername: async (params: RestEndpointMethodTypes["users"]["getByUsername"]["parameters"]): Promise<RestEndpointMethodTypes["repos"]["get"]["response"]> =>
      handle(["users", "getByUsername"], params, () => octokit.users.getByUsername(params)),
  },
};
