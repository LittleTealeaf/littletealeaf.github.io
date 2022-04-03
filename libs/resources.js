const fs = require('fs');
const paths = require('path');

export function getGenerated(...path) {
    return require(`../generated/${path.join('/')}`);
}

export class Build {
    static get(reference) {
        return require(`../build/${reference}`);
    }

    static storeJSON(data,...path) {
        const fullPath = `./build/${path.join('/')}`
        fs.mkdirSync(paths.dirname(fullPath),{recursive: true});
        fs.writeFileSync(fullPath,JSON.stringify(data));
        return path.join('/');
    }
}