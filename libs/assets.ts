export const getResource = (ref: string) => require(`resources/${ref}`);

import ImportedIndex from "resources/index.json";

export const Index = ImportedIndex;

/*
TODO figure out a way to make it so that it doesn't load the entirety of assets for each page
*/
