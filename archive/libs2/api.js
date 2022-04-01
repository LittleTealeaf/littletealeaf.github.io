import { CacheManager, getPathDeprecated } from './resources';
const { Octokit } = require("@octokit/core");

const fs = require('fs');

export class Github {

    static octokit = new Octokit({
        auth: fs.existsSync(getPathDeprecated('github_token')) ? fs.readFileSync(getPathDeprecated('github_token')).toString() : process.env.API_GITHUB
    });
    static cache = new CacheManager('githubapi');

    static async getAPI(url,getJson=false) {
        const stored = this.cache.get(url);
        if(stored != null) {
            return stored;
        }

        console.log(`API: ${url}`)

        const request = await this.octokit.request(`GET`,{
            url: url,
            type: 'public'
        });
    
        this.cache.store(url,request.data);
        return getJson ? request.data : url;
    }

    static getCached(key) {
        
    }
}