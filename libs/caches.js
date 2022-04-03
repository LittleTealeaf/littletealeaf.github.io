const fs = require('fs');
const paths = require('path');

export default class Cache {
    constructor(...category) {
        this.path = ['.','cache',category.join('/')].join('/') + '.json';
    }
    
    load() {
        var cache = {}
        if(fs.existsSync(this.path)) {
            cache = JSON.parse(fs.readFileSync(this.path));
        }
        return cache;
    }

    save(cache) {
        fs.mkdirSync(paths.dirname(this.path),{recursive: true});
        fs.writeFileSync(this.path,JSON.stringify(cache));
    }

    store(key,value) {
        const cache = this.load();
        cache[key] = {
            expires: Date.now() + 1000 * 60 * 60 * 24,
            value
        }
        this.save(cache);
    }

    get(key) {
        const cache = this.load();
        if(cache[key] != null) {
            if(cache[key].expires < Date.now()) {
                return cache[key].value;
            }
        }
        return null;
    }
}