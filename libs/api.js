import { CacheManager, getPath } from './resources';
const { Octokit } = require("@octokit/core");

const fs = require('fs');

export class Github {

    static octokit = new Octokit({
        auth: fs.existsSync(getPath('github_token')) ? fs.readFileSync(getPath('github_token')).toString() : process.env.API_GITHUB
    });
    static cache = new CacheManager('githubapi');

    static async getAPI(url) {

        const key = `${url}`;
        
        const stored = this.cache.get(key);
        if(stored != null) {
            return stored;
        }

        console.log(`API: ${url}`)

        const request = await this.octokit.request(`GET`,{
            url: url,
            type: 'public'
        });
    
        this.cache.store(key,request.data);
        return request.data;
    }
}