var navElements = {
    'navHome':'/',
    'navProjects':'/projects/',
    'navGithub':'https://github.com/LittleTealeaf',
    'navAboutMe':'/aboutme/'
}

const curloc = window.location['pathname']

window.onload = _ => {
    for(const [key,value] of Object.entries(navElements)) {
        if(value != curloc) {
            document.getElementById(key).onclick = _ => window.location = value;
        } else {
            document.getElementById(key).disabled = true;
        }
    }
}