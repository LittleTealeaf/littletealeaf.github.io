const paths = require('path');
const fs = require('fs');

/*

Separate into different directories dedicated for certain items:
 - Resources: Files generated as resources and strictly used with requires() to fetch
 - Assets: Files manually stored that are strictly fetched using requires()
 - Content: Files used to generate Assets
 - Cache: stored cache values

*/

/**
 * Manages data stored within caches. Caches are found in the `cache/` directory. Each cache has a "category" in order to reduce the size of individual caches.  
 * 
 * Only usable during server-side scripts
 */
export class CacheManager {
    constructor(category) {
        this.category = category;
        this.path = paths.join(process.cwd(),'cache',`${category}.json`);
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
        if(fs.existsSync(this.path)) {
            return JSON.parse(fs.readFileSync(this.path));
        } else {
            return {};
        }
    }
    
    save(values) {
        const dir = paths.dirname(this.path);
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir,{recursive: true});
        }
        fs.writeFileSync(this.path,JSON.stringify(values));
    }
}

/**
 * Provides methods to access files within the `assets/` directory.
 * 
 * The assets directory contains files manually stored for use in rendering. Files in the assets directory are only accesssed using the `requires(...)` method.
 */
export class Assets {

}

/**
 * Provides methods to access files within the `config/` directory
 * 
 * The `config/` directory contains files used to generate files. "Config" files are read using the file system library.
 * 
 * Only usable during server-side scripts
 */
export class Config {

}

/**
 * Provides methods to access files created in the `generated/` directory
 * 
 * the `generated/` directory contains files dynamically generated during server-side scripts. This allows for the server-scripts to save large amounts of data for rendering to use.
 * 
 * Store functions are only accessibile during server-side scripts  
 * Load functions utilize `requires()` to be usable during rendering.
 */
export class Generated {

}