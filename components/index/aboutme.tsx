import scss from "styles/components/index/aboutme.module.scss";
import classNames from "classnames";
import { Avatar } from "@mui/material";

const Component = ({
  content,
}: {
  content: {
    title: string;
    paragraphs: Array<string>;
  };
}) => (
  <>
    <div className={scss.component}>
      <div className={scss.content}>
        <div className={scss.text}>
          <h2>{content.title}</h2>
          {content.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {/* Plans: Instead of having the content values, hard-code this in because it's easier */}
        <div className={classNames("square", scss.avatar)}>
          <Avatar alt="An image of me" src={require("assets/images/index/aboutme.jpg")} sx={{ width: "100%", height: "100%", maxWidth: "300px", maxHeight: "300px" }} />
        </div>
      </div>
    </div>
  </>
);

export default Component;
