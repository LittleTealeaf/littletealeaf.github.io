import { getPath } from './files';

const fs = require('fs');


export function getAllProjectIds() {
    return fs.readdirSync(getPath('assets','projects')).map((file) => ({
        params: {
            id: JSON.parse(fs.readFileSync(getPath('assets','projects',file))).endpoint
        }
    }));
}

export function getProjectData(id) {
    const element = {}
    return {
        id,
        element   
    }
}