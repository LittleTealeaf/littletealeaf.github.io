import Header from '../../components/header'
import StyleClass from '../../libs/styleutil'
import style from '../../styles/style.module.css'
import { Resume} from '../../libs/assets'




export default function Home() {
    return (
      <div>
        <Header path={
          ["Resume"]
        }/>
        <center>
          <h1 className={StyleClass(style.section, style.header1)}>{Resume.name}</h1>
        </center>
      </div>
    )
  }