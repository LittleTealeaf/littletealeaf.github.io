// import projects from '../assets/generated/json/projects.json'
import {Projects} from "./assets";


export function getAllProjectIds() {
    return Projects.map(project => {
        return {
            params: {
                id: project.api.name
            }
        }
    });
}

export function getProjectData(id) {
    var project = null;
    Projects.forEach(element => {
        if(element.api.name == id) {
            project = {
                id, 
                element
            }
        }
    });
    return project;
}