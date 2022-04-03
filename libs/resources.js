

export function getGenerated(...path) {
    require(`../generated/${path.join('/')}`);
}