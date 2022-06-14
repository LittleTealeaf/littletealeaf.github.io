import css from "styles/components/index/aboutme.module.scss";
import classNames from "classnames";
import { Avatar } from "@mui/material";
import { Content } from "content/index/aboutme";

const Component = ({}) => (
  <>
    <div id="aboutme" className={css.component}>
      <div className={css.container}>
        <div className={css.text}>
          <h2>{"About Me"}</h2>
          {Content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className={classNames("square", css.avatar)}>
          <Avatar alt="An image of me" src={require("assets/images/index/aboutme.jpg")} sx={{ width: "100%", height: "100%", maxWidth: "300px", maxHeight: "300px" }} />
        </div>
      </div>
    </div>
  </>
);

export default Component;
