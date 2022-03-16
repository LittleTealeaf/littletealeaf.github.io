// import projects from '../assets/generated/json/projects.json'
import {getAsset, Projects} from "./assets";


export function getAllProjectIds() {
    return Projects.map(reference => {
        return {
            params: {
                id: getAsset(getAsset(reference).repository).name
            }
        }
    });
}

export function getProjectData(id) {
    var project = null;
    Projects.forEach(reference => {
        var element = getAsset(reference);
        if(getAsset(element.repository).name == id) {
            project = {
                id, 
                element
            }
        }
    });
    return project;
}