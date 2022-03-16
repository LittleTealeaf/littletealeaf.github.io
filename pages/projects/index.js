import Header from '../../components/header';
import Link from 'next/link';
import {Projects, getAsset} from '../../libs/assets';

const ProjectHref = (api) =>  "/projects/" + api.name;

const ProjectDisplay = (projectref,index) => {
  const project = getAsset(projectref);
  const api = getAsset(project.api);
  return (
    <div>
      <Link id={index} href={ProjectHref(api)}>{api.name}</Link>
    </div>
  )
};

export default function Home() {
    return (
      <div>
        <Header path={
          ["Projects"]
        }/>
        I AM A PROJECT BIRD
        <div>
          {
            Projects.map(ProjectDisplay)
          }
        </div>
      </div>
    )
  }