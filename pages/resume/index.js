import Header from '../../components/header'
import StyleClass from '../../libs/styleutil'
import style from '../../styles/style.module.css'
import { getAsset, Resume } from '../../libs/assets'

const Skills = () => {

  const SkillCategory = (category, i) => {

    const SkillsList = (skill) => {

      const item = skill.attributes.length > 0 ? <abbr title={skill.attributes.join(', ')}>{skill.name}</abbr> : <div>{skill.name}</div>;

      return <div style={{'flex-grow':1,'textAlign':'left'}}>
        {item}
      </div>
    }

    return (
      <div id={i} style={{
        'flex-grow': 1,
        'padding':'5px'
        }}>
        {/* <div><b>{category.name}</b> {getAsset(category.values).map(SkillsList)}</div> */}
        <div style={{
          'textAlign':'left'
        }}><b>{category.name}</b></div>
        <div style={{
          'display':'flex',
          'flex-direction':'column', 
          'flex-wrap':'wrap'
          }}>
        {getAsset(category.values).map(SkillsList)}
        </div>
      </div>
    )
  }
  return (
    <div className={StyleClass(style.section)}>
      <h1>Skills</h1>
      <div style={{'display':'flex', 'flex-direction':'row'}}>
        {getAsset(Resume.skills).map(SkillCategory)}
      </div>
    </div>
  )
};

export default function Home({router}) {
    return (
      <div>
        <Header router={router}/>
        <center>
          <h1 className={StyleClass(style.section, style.header1)}>{Resume.name}</h1>
          {Skills()}
        </center>
      </div>
    )
  }
