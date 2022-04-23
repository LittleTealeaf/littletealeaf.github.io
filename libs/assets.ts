export const getAsset = (ref: string) => require(`assets/${ref}`);

import ImportedIndex from "assets/index.json";

export const Index = ImportedIndex;

/*
TODO figure out a way to make it so that it doesn't load the entirety of assets for each page
*/
