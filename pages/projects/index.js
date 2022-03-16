import Header from '../../components/header';
import Link from 'next/link';
import {Projects, getAsset} from '../../libs/assets';

const ProjectHref = (repo) =>  "/projects/" + repo.name;

const ProjectDisplay = (projectref,index) => {
  const project = getAsset(projectref);
  const repo = getAsset(project.repository);
  return (
    <div>
      <Link id={index} href={ProjectHref(repo)}>{repo.name}</Link>
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