import Header from '../../components/header'
import StyleClass from '../../libs/styleutil'
import style from '../../styles/style.module.css'
import { getAsset, Resume} from '../../libs/assets'

const Skills = () => {

  const SkillCategory = (category, i) => {

    const SkillsList  = (skill, i) => {
      if (skill.attributes.length > 0) {
        return `${skill.name} (${skill.attributes.join(', ')})`;
      } else {
        return skill.name;
      }
    }

    const name = category.name;
    const values = getAsset(category.values);

    return (
      <div id={i}>
        <p><b>{name}</b> {values.map(SkillsList).join(', ')}</p>
      </div>
    )
  }


  const skills = getAsset(Resume.skills);
  return (
    <div className={StyleClass(style.section)}>
      <h1>Skills</h1>
      {skills.map(SkillCategory)}
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