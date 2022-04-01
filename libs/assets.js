// Manages references to the assets page, including any static / used references
import Index from '../generated/index.json'

export function getAsset(genpath) {
    return require('../generated/' + genpath);
}

export const Projects = getAsset(Index.projects);
export const Resume = getAsset(Index.resume);
export const Analytics = getAsset(Index.analytics);
export const Navigation = getAsset(Index.navigation);
export const WebsiteRepository = getAsset(Index.website_repository);
export const Emojis = getAsset(Index.emojis);
