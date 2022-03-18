import Header from '../../components/header';
import Link from 'next/link';
import style from '../../styles/style.module.css'
import { Projects, getAsset } from '../../libs/assets';

const ProjectHref = (repo) => "/projects/" + repo.name;

const ProjectDisplay = (projectref, index) => {
  const project = getAsset(projectref);
  const repo = getAsset(project.repository);
  const attributes = getAsset(project.attributes);

  const name = attributes.name == null ? repo.name : attributes.name;
  const description = attributes.description == null ? repo.description : attributes.description;


  return (
    <div className={style.section} style={{
      'flexGrow':1
    }}>
      <div>
        <center>
          <Link id={index} href={ProjectHref(repo)} passHref>
            <a style={{
              'textDecoration': 'none',
              'color': 'black',
              'fontSize': '16px', 
              'textAlign': 'center',
              'fontFamily':'cursive'
            }}>
              <b>{name}</b>
            </a>
          </Link>
        </center>
      </div>
      <div>{description}</div>
    </div>
  )
};

export default function Home({ router }) {
  return (
    <div>
      <Header router={router} />
      <div style={{
        'margin': '20px',
        'display': 'flex',
        'flexDirection': 'row',
        'flexWrap': 'wrap'
      }}>
        {
          Projects.map(ProjectDisplay)
        }
      </div>
    </div>
  )
}