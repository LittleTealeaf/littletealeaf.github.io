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

    static async getURL(url, headers={}) {
        const key = `${url} headers:${JSON.stringify(headers)}`

        const stored = this.cache.get(key);
        if(stored != null) {
            console.log(`CHE: ${key}`);
            return stored;
        }

        console.log(`API: ${key}`);
        const request = await this.octokit.request('GET', {
            url: url,
            headers
        });

        const data = request.data;

        this.cache.store(key,data);
        return data;

    }

    static async paginate(url,count) {
        const items = [];
        var page = 1;
        const per_page = 100;
        while(items.length < count) {
            const data = await this.getURL(url,{
                per_page,
                page
            });
            for(var i = 0; i < data.length; i++) {
                if(items.length < count) {
                    items.push(data[i]);
                } else {
                    return items;
                }
            }
            if(data.length < per_page) {
                return items;
            }
            page = page + 1;
        }
        return items;
    }    
}