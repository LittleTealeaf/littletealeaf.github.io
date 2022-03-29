const paths = require('path');
const fs = require('fs');

export class Cache {
    /**
     * Caches a value at a provided location
     * @param {string} type The type of cache to store. Will store in the file with the format \<type\>.json
     * @param {string} key The key to store the value as 
     * @param {any} value The value to store
     */
    static store(type, key, value) {
        const che = this.loadCache(type);
        che[key] = {
            time: Date.now(),
            expires: Date.now() + 1000 * 60 * 60 * 12,
            value: value
        };
        this.saveCache(type,che);
    }

    static get(type, key) {
        const che = this.loadCache(type);
        if(che[key] != null && che[key].expires > Date.now()) {
            return che[key].value;
        } else {
            return null;
        }
    }
    
    static loadCache(type) {
        const path = this.getCachePath(type);
        if(fs.existsSync(path)) {
            return JSON.parse(fs.readFileSync(path));
        } else {
            return {};
        }
    }

    static saveCache(type,cache) {
        writeFile(this.getCachePath(type),JSON.stringify(cache));
    }

    static getCachePath(type) {
        return getPath('cache',`${type}.json`);
    }
}

export function getPath(...dirs) {
    return paths.join(process.cwd(), ...dirs);
}

export function writeFile(path, data) {
    const dirpath = paths.basename(paths.dirname(path));
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath);
    }
    fs.writeFileSync(path, data);
}

