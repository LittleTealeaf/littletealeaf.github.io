const index = require('../generated/index.json')

export function getGenerated(ref) {
    return require(`../generated/${ref}`);
}

export {index}