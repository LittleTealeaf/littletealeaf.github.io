import { CacheManager, getPath } from './resources';
const { Octokit } = require("@octokit/core");

const fs = require('fs');

export class Github {

    static octokit = new Octokit({
        auth: fs.existsSync(getPath('github_token')) ? fs.readFileSync(getPath('github_token')).toString() : process.env.API_GITHUB
    });

    static async getAPI(url,type='GithubAPI') {

        const key = `${url}`;
        
        const cache = CacheManager.get(type,key);
        if(cache != null) {
            return cache;
        }

        console.log(`API: ${url}`)

        const request = await this.octokit.request(`GET`,{
            url: url,
            type: 'public'
        });
    
        CacheManager.store(type,key,request.data);
        return request.data;
    }
}