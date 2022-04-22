export const getAsset = (ref: String) => require(`generated/${ref}`);

export const Index = getAsset('index.json');
