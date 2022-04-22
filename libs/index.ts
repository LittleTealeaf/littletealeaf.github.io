const Index = require('../generated/index.json');

export default Index;

export const getAsset = (ref: String) => require(`generated/${ref}`);
