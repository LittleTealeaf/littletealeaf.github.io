const PATHS = require('path');
const FS = require('fs');

// TODO CHANGES:
/*

Separate into different directories dedicated for certain items:
 - Resources: Files generated as resources and strictly used with requires() to fetch
 - Assets: Files manually stored that are strictly fetched using requires()
 - Content: Files used to generate Assets
 - Cache: stored cache values

*/

/**
 * Manages caches. Only usable on Server-Side rendering
 */
export class CacheManager {
    constructor(category) {
        this.category = category;
        this.path = PATHS.join(process.cwd(),'cache',`${category}.json`);
        this.clean();
    }

    clean() {
        Object.keys(this.load()).forEach(key => this.get(key));
    }

    store(key,value) {
        const cache = this.load();
        cache[key] = {
            time: Date.now(),
            expires: Date.now() + 1000 * 60 * 60 * 24,
            value: value
        };
        this.save(cache);
    }

    get(key) {
        const cache = this.load();
        if(cache[key] != null) {
            if(cache[key].expires > Date.now()) {
                return cache[key].value;
            } else {
                delete cache[key];
                this.save(cache);
            }
        }
        return null;
    }

    load() {
        if(FS.existsSync(this.path)) {
            return JSON.parse(FS.readFileSync(this.path));
        } else {
            return {};
        }
    }

    save(values) {
        buildDirectory(this.path);
        FS.writeFileSync(this.path,JSON.stringify(values));
    }
}

/**
 * Allows for storing resources during server-side rendering, and fetching resources during client-side
 */
export class Resource {

    static store(path,content) {
        const full_path = PATHS.join(process.cwd(),'resources',path);
        buildDirectory(full_path);
        FS.writeFileSync(full_path,content);
        return path;
    }

    /**
     * Stores an object as a .json file
     * @param {String} path String of the directory path, separated by /
     * @param {*} object 
     */
    static storeJSON(path,object) {
        return this.store(`${path}.json`,JSON.stringify(object));
    }

    static load(path) {
        try {
         return require(`../resources/${path}`)
        } catch {
            return null;
        }
    }
}

export class Assets {
    // static requireAsset(path) {
    //     return require(`../assets/${path}`);
    // }

    static readAsset(path) {
        return FS.readFileSync(`assets/${path}`);
    }
}

// export function requireAsset(path) {
//     return require(`../assets/${path}`);
// }

function buildDirectory(path) {
    const dirpath = PATHS.dirname(path);
    if(!FS.existsSync(dirpath)) {
        FS.mkdirSync(dirpath, {recursive: true});
    }
}