import { Octokit } from "@octokit/core";
const fs = require('fs');
const paths = require('path');
import { CacheManager } from "./resources";


export class Github {
    static octokit = new Octokit({
        auth: fs.existsSync('../github_token') ? fs.readFileSync('../github_token').toString() : process.env.API_GITHUB
    });
    static cache = new CacheManager('GithubApi');

    static async getAPI(url) {
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
}