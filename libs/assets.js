// Manages references to the assets page, including any static / used references
import Index from '../generated/index.json'

export function getAsset(genpath) {
    return require('../generated/' + genpath);
}

const Projects = getAsset(Index.projects);
const Resume = getAsset(Index.resume);
const Analytics = getAsset(Index.analytics);
const Navigation = getAsset(Index.navigation);
const WebsiteRepository = getAsset(Index.website_repository);

export {Projects, Navigation, Resume, Analytics, WebsiteRepository}