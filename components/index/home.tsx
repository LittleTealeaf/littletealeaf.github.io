import scss from "styles/components/index/home.module.scss";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { Icon } from "@mui/material";

const IconLink = ({ component, href }) => (
  <a href={href} className={scss.iconholder}>
    <Icon component={component} />
  </a>
);

const Component = ({ content }: { content: { name: string; labels: string[]; position: string } }) => (
  <>
    <div
      className={scss.component}
      style={{
        background: `url(${require("assets/images/index/home.jpg")}) no-repeat top center`,
        WebkitBackgroundSize: "cover !important",
      }}
    >
      <div className={scss.content}>
        {content.name}
        <hr />
        <div className={scss.labels}>
          {content.labels.map((label, index) => (
            <p key={index}>{label}</p>
          ))}
        </div>

        <p>{content.position}</p>
        <ul>
          {[
            <IconLink key={"github"} component={GitHubIcon} href={"https://www.github.com/LittleTealeaf"} />,
            <IconLink key={"linkedin"} component={LinkedInIcon} href={"https://www.linkedin.com/in/thomas-kwashnak"} />,
            <IconLink key={"mail"} component={EmailIcon} href={"mailto:thomaskwashnak@gmail.com"} />,
          ].map((item) => (
            <li key={item.key}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default Component;
