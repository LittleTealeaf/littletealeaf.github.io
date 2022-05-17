import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
import { RequestParameters } from "@octokit/types";
import { getCache, setCache } from "./cache";

const octokit = new Octokit({
  auth: process.env.API_GITHUB,
  userAgent: "littletealeaf.github.io v0.1.0",
});

const handle = async (
  type: Array<string>,
  params: RequestParameters &
    Omit<
      {
        owner: string;
        repo: string;
      },
      "baseUrl" | "headers" | "mediaType"
    >,
  fallback: Function
) => {
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

export const client = {
  repos: {
    get: async (
      params: RequestParameters &
        Omit<
          {
            owner: string;
            repo: string;
          },
          "baseUrl" | "headers" | "mediaType"
        >
    ): Promise<RestEndpointMethodTypes["repos"]["get"]["response"]> => handle(["repos", "get"], params, () => octokit.repos.get(params)),
  },
};
