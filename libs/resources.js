const paths = require('path');
const fs = require('fs');
const uniqueFilename = require('unique-filename');

export class CacheManager {
    constructor(type) {
        this.type = type;
        this.path = getPath('cache', `${type}.json`);
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

export class Resource {
    static text(data) {
        const filePath = uniqueFilename('./gen', null, data);
        writeFile(filePath, data);
        return filePath;
    }

    static json(data) {
        return this.text(JSON.stringify(data));
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

export function fileExists(path) {
    return fs.existsSync(path);
}

export function readFile(path) {
    return fs.readFileSync(path).toString();
}