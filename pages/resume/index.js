import Header from '../../components/header'
import StyleClass from '../../libs/styleutil'
import style from '../../styles/style.module.css'
import { getAsset, Resume } from '../../libs/assets'

const Skills = () => {
  const SkillCategory = (cateogry, i) => {

    const SkillDisplay = (skill) => (
      skill.attributes.length == 0 ? skill.name : `${skill.name} (${skill.attributes.join(', ')})`
    );

    return (
      <tr key={i}>
        <td><center><b>{cateogry.name}</b></center></td>
        <td>{getAsset(cateogry.values).map(SkillDisplay).join(", ")}</td>
      </tr>
    );
  }

  return (
    <div className={StyleClass(style.section)}>
      <h1 className={StyleClass(style.header1,style.widesection)} style={{
        'margin': '0px',
        'width': '80%'
      }}>Skills</h1>
      <table class={style.widesection}>
        {getAsset(Resume.skills).map(SkillCategory)}
      </table>
    </div>
  );
};

export default function Home({ router }) {
  return (
    <div>
      <Header router={router} />
      <center>
        <h1 className={StyleClass(style.section, style.header1)}>{Resume.name}</h1>
        {Skills()}
      </center>
    </div>
  )
}
