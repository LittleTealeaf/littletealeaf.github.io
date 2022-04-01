import { Octokit } from "@octokit/core";
import { CacheManager } from "./resources";
const fs = require('fs');


export class Github {
    static octokit = new Octokit({
        auth: fs.existsSync('../github_token') ? fs.readFileSync('../github_token').toString() : process.env.API_GITHUB
    });
    static cache = new CacheManager('githubapi');

    static async get(url) {
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

    static async getRepo(repo) {
        return this.get(`https://api.github.com/repos/${repo}`)
    }
}