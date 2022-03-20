// Manages references to the assets page, including any static / used references
import Navigation from '../config/navigation.json';
import Index from '../generated/index.json'



export function getAsset(genpath) {
    return require('../generated/' + genpath);
}

const Projects = getAsset(Index.projects);
const Resume = getAsset(Index.resume);
const Analytics = getAsset(Index.analytics);

export {Projects, Navigation, Resume, Analytics}