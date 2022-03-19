// Manages references to the assets page, including any static / used references
import Navigation from '../assets/config/navigation.json';
import Index from '../assets/generated/index.json';



export function getAsset(genpath) {
    return require('../assets/generated/' + genpath);
}

const Projects = getAsset(Index.projects);
const Resume = getAsset(Index.resume);

export {Projects, Navigation, Resume}