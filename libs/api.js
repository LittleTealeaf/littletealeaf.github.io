import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { paginateRest } from "@octokit/plugin-paginate-rest";

import CacheManager from "./caches";

const MyOctokit = Octokit.plugin(restEndpointMethods).plugin(paginateRest);

//TODO: perhaps give up on the pagination and instead do it the manual way that I know? either that, or we figure out octokit

const fs = require('fs');

export class Github {
    static octokit = new MyOctokit({
        auth: fs.existsSync('github_token') ? fs.readFileSync('github_token').toString() : process.env.API_GITHUB
    });
    static cache = new CacheManager('api','github');
    static async getURL(url) {
        const stored = this.cache.get(url);
        if(stored != null) {
            console.log(`CHE: ${url}`);
            return stored;
        }

        console.log(`API: ${url}`);
        const request = await this.octokit.request('GET', {
            url: url
        });

        const data = request.data;

        this.cache.store(url,data);
        return data;

    }

    static async paginateEndpoint(name,endpoint,properties, count) {
        const key = `${name} count:${count} properties: ${JSON.stringify(properties)}`
        const stored = this.cache.get(key);
        if(stored != null) {
            console.log(`CHE: ${key}`);
            // return stored;
        }

        const iterator = this.octokit.paginate.iterator(endpoint,properties);
        const items = []
        for await (const {data: issues} of iterator) {
            for(const issue of issues) {
                items.push(issue);
                if(items.length >= count) {
                    break;
                }
            }
            if(items.length >= count) {
                break;
            }
        }

        this.cache.store(key,items);
        return items
    }

    static async test() {
        return await this.paginateEndpoint("data",this.octokit.rest.issues.listForRepo, {
            owner: "LittleTealeaf",
            repo: "littletealeaf.github.io",
            per_page: 100
        },100);
    }
    
}