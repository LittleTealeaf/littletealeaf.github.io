import projects from '../assets/generated/projects.json'


export function getAllProjectIds() {
    return projects.map(project => {
        return {
            params: {
                id: project.api.name
            }
        }
    });
}

export function getProjectData(id) {
    var project = null;
    projects.forEach(element => {
        if(element.api.name == id) {
            project = {
                id, 
                element
            }
        }
    });
    return project;
}