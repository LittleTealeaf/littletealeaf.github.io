import css from "styles/pages/resume.module.scss";
import { GitHubAPI } from "libs/github";
import Fab from "@mui/material/Fab";
import cs from "classnames";
import PrintIcon from "@mui/icons-material/Print";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Icon } from "@mui/material";
import data from "content/resume.json";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

import Head from "next/head";

const print = () => window.print();

const Header = ({}) => (
  <>
    <div className={css.header}>
      <div className={css.header_name}>{"Thomas Kwashnak"}</div>
      <div className={css.header_info}>
        <ul>
          <HeaderLink component={EmailIcon} href={"mailto:thomaskwashnak@gmail.com"} text={"thomaskwashnak@gmail.com"} />
          <HeaderLink component={LinkedInIcon} href={"https://www.linkedin.com/in/thomas-kwashnak"} text={"www.linkedin.com/in/thomas-kwashnak"} />
          <HeaderLink component={GitHubIcon} href={"https://github.com/LittleTealeaf"} text={"github.com/LittleTealeaf"} />
          <HeaderLink component={LanguageIcon} href={"https://littletealeaf.github.io"} text={"littletealeaf.github.io"} />
        </ul>
      </div>
    </div>
  </>
);

const HeaderLink = ({ component, href, text }: { component: any; href: string; text?: string }) => (
  <li>
    <a href={href}>
      <Icon component={component} />
      <span>{text == null ? href : text}</span>
    </a>
  </li>
);

const Education = ({}) => (
  <>
    <div className={css.education}>
      <h1>{"Education"}</h1>
    </div>
  </>
);

const Employment = ({}) => <></>;

const Page = ({}) => (
  <>
    <Head>
      <title>{"Thomas Kwashnak - Resume"}</title>
    </Head>
    <div className={css.page}>
      <Header />
      <hr />
      <Education />
      <hr />
      <Employment />
    </div>
    <Fab
      className={css.print_hide}
      style={{
        position: "absolute",
        right: "20px",
        bottom: "20px",
      }}
      onClick={print}
    >
      <PrintIcon />
    </Fab>
  </>
);

export default Page;
