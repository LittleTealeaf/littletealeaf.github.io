const PATHS = require('path');
const FS = require('fs');

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
        FS.writeFileSync(this.path,JSON.stringify(values));
    }
}