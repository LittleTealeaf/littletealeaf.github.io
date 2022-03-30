import { cwd } from 'process';

const fs = require('fs');
const uniqueFilename = require('unique-filename');
const paths = require('path');

export class CacheManager {
    constructor(type) {
        this.type = type;
        this.path = getPathDeprecated('cache', `${type}.json`);
        this.clean();
    }

    clean() {
        Object.keys(this.load()).forEach((key) => {
            this.get(key);
        });
    }

    store(key, value) {
        const cache = this.load();
        cache[key] = {
            time: Date.now(),
            expires: Date.now() + 1000 * 60 * 60 * 24,
            value: value
        }
        this.save(cache);
    }

    get(key) {
        const cache = this.load();
        if (cache[key] != null) {
            if (cache[key].expires > Date.now()) {
                return cache[key].value;
            } else {
                delete cache[key];
                this.save(cache);
            }
        }
        return null;
    }

    load() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(fs.readFileSync(this.path));
        } else {
            return {};
        }
    }

    save(cache) {
        writeFile(this.path, JSON.stringify(cache));
    }
}

export class ResourceDeprecated {
    static text(data) {
        const filePath = uniqueFilename('./gen', null, data);
        writeFile(filePath, data);
        return filePath;
    }

    static json(data) {
        return this.text(JSON.stringify(data));
    }
}

/**
 * Deprecated
 * @param  {...any} dirs 
 * @returns 
 */
export function getPathDeprecated(...dirs) {
    return paths.join(process.cwd(), ...dirs);
}

/**
 * Deprecated
 * @param {*} path 
 * @param {*} content 
 */
export function writeFile(path, content) {
    const dirpath = paths.basename(paths.dirname(path));
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath);
    }
    fs.writeFileSync(path, content);
}


export class Resource {
    /**
     * 
     * @param {String[]} route Array of path elements
     * @param {String} content Text content to store
     */
    static text(route,content) {
        writeFile(getFullPath(route),content);
        return this.getPath(route);
    }

    static json(route,data) {
        return this.text(route,JSON.stringify(data));
    }

    static getPath(route) {
        return `../${route.join('/')}`;
    }
}

export function getFullPath(route) {
    return paths.join(process.cwd(),...route);
}
