import css from "styles/pages/resume.module.scss";
import Fab from "@mui/material/Fab";
import PrintIcon from "@mui/icons-material/Print";
import cn from "classnames";
import Head from "next/head";
import { Contacts, Education, Languages, Skills, Summary } from "content/resume";
import { RenderIf, RenderPresent } from "components/utils";

const PrintButton = () => (
  <>
    <Fab className={cn(css.print_hide, css.print_button)} onClick={() => window.print()}>
      <PrintIcon />
    </Fab>
  </>
);

const Header = () => (
  <>
    <div className={css.header}>
      <h1>{"Thomas Kwashnak"}</h1>
      <div className={css.contacts}>
        {Contacts.map((contact, key) => (
          <div key={key} className={css.contact}>
            <a href={contact.href} target={"_blank"} rel="noreferrer">
              <contact.icon />
              <span>{contact.contact}</span>
            </a>
          </div>
        ))}
      </div>
      <hr />
    </div>
  </>
);

const Section = ({ children, name, className }: { children?: any; name: string; className?: string }) => (
  <div className={className == null ? css.section : cn(css.section, className)}>
    <h3>{name}</h3>
    {children != null ? children : <></>}
  </div>
);

const SummarySection = () => (
  <Section name="Summary">
    <p>{Summary}</p>
  </Section>
);

const LanguagesSection = () => (
  <Section name="Programming Languages" className={css.section_list}>
    <ul>
      {Languages.map((language, index) => (
        <li key={index}>
          {language.name}
          {language.frameworks == null ? <></> : ` (${language.frameworks.join(", ")})`}
        </li>
      ))}
    </ul>
  </Section>
);

const SkillsSection = () => (
  <Section name="Skills" className={css.section_list}>
    <ul>
      {Skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </Section>
);

const EducationSection = () => (
  <Section name="Education" className={css.section_block}>
    {Education.map((education) => (
      <>
        <h4>{education.school}</h4>
        <div className={css.block_content}>
          <div id="graduation">{"Class of " + education.graduation}</div>
          {RenderPresent(education.gpa, () => (
            <div id="gpa">{education.gpa}</div>
          ))}
          {RenderIf(education.majors != null || education.minors != null, () => (
            <>
              {RenderPresent(education.majors, () => (
                <div>{"Majors: " + education.majors.join(", ")}</div>
              ))}
              {RenderPresent(education.minors, () => (
                <div>{"Minors: " + education.minors.join(", ")}</div>
              ))}
            </>
          ))}
        </div>
      </>
    ))}
  </Section>
);

const Page = ({}) => (
  <>
    <Head>
      <title>{"Thomas Kwashnak - Resume"}</title>
    </Head>
    <div className={css.background}>
      <div className={cn(css.page, css.no_box_shadow)}>
        <Header />
        <div className={css.content}>
          <SummarySection />
          <EducationSection />
          <SkillsSection />
          <LanguagesSection />
        </div>
      </div>
    </div>
    <PrintButton />
  </>
);

export default Page;
