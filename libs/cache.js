const fs = require('fs');

const DIR = './cache';
const PATH_DATA = DIR + '/data.json'

// clean up expired values
const local_cache = loadCache();
Object.keys(local_cache).forEach((item) => {
    if(load(item) == null) {
        delete local_cache[item];
    }
});
saveCache(local_cache);

function loadCache() {
    if(fs.existsSync(PATH_DATA)) {
        return JSON.parse(fs.readFileSync(PATH_DATA));
    } else {
        return {};
    }
}

function saveCache(cache) {
    if(!fs.existsSync(DIR)) {
        fs.mkdirSync(DIR);
    }
    fs.writeFileSync(PATH_DATA,JSON.stringify(cache)); 
}

export function save(key, value) {
    const cache = loadCache();
    cache[key] = {
        time: Date.now(),
        expires: Date.now() + 1000 * 60 * 60 * 12,
        value: value
    }
    saveCache(cache);
       
}

export function load(key) {
    const cache = loadCache();
    if(cache[key] != null && cache[key].expires > Date.now()) {
        return cache[key].value;
    } else {
        return null;
    }
}