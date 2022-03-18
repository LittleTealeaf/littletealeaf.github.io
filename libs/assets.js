// Manages references to the assets page, including any static / used references
import Navigation from '../assets/navigation.json';
import Index from '../assets/generated/index.json';
import Resume from '../assets/resume.json'



export function getAsset(genpath) {
    return require('../assets/generated/' + genpath);
}

const Projects = getAsset(Index.projects);

export {Projects, Navigation, Resume}