// Manages references to the assets page, including any static / used references
import Navigation from '../assets/navigation.json'
import Projects from '../assets/generated/projects.json'
import Events from '../assets/generated/events.json'

export function getAsset(genpath) {
    return require('../assets/generated/' + genpath);
}

export {Projects, Events, Navigation}