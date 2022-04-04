const fs = require('fs');
const paths = require('path');

export function getGenerated(...path) {
    return require(`../generated/${path.join('/')}`);
}

export class Build {
    static get(reference) {
        console.log("Fetching from ../build/" + reference)
        return require(`../build/${reference}`);
    }

    static storeJSON(data,...path) {
        const fullPath = `./build/${path.join('/')}`
        fs.mkdirSync(paths.dirname(fullPath),{recursive: true});
        fs.writeFileSync(fullPath,JSON.stringify(data));
        console.log("Wrote file to build/" + path.join('/'));
        return path.join('/');
    }
}