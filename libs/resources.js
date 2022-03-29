import paths from 'path';
import fs from 'fs';

export class Cache {
    /**
     * Caches a value at a provided location
     * @param {string} type The type of cache to store. Will store in the file with the format \<type\>.json
     * @param {string} key The key to store the value as 
     * @param {any} value The value to store
     */
    static store(type, key, value) {

    }

    static get(type, key) {
        return null;
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

