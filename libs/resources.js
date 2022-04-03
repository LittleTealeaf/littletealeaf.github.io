

export function getGenerated(...path) {
    return require(`../generated/${path.join('/')}`);
}