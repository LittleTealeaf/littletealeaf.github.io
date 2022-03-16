import Header from '../../components/header'
import projects from '../../assets/generated/projects.json'
import Link from 'next/link'

const ProjectHref = (project) =>  "/projects/" + project.api.name;

const ProjectDisplay = (project,index) => (
  <div>
    <Link id={index} href={ProjectHref(project)}>{project.api.name}</Link>
  </div>
);

export default function Home() {
    return (
      <div>
        <Header path={
          ["Projects"]
        }/>
        I AM A PROJECT BIRD
        <div>
          {
            projects.map(ProjectDisplay)
          }
        </div>
      </div>
    )
  }