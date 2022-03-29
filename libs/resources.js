const paths = require('path');
const fs = require('fs');

export class Cache {
    static store(type, key, value) {

    }

    static get(type, key) {

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

