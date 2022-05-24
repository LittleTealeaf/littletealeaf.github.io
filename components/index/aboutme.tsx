import css from "styles/components/index/aboutme.module.scss";
import classNames from "classnames";
import { Avatar } from "@mui/material";

const Component = ({}) => (
  <>
    <div id="aboutme" className={css.component}>
      <div className={css.container}>
        <div className={css.text}>
          <h2>{"About Me"}</h2>
          {[
            "I'm Thomas Kwashnak, a self-motivated nerd from Connecticut, where I am currently in college studying Computer Science and Data Science. Apart from programming, I love playing video games, practicing martial arts, and many other things!",
            "In martial arts, I am currently a third degree black belt in my federation. I've been practicing since I was very young. I've furthered my learning by teaching martial arts to younger kids, as well as teaching weapons to all ages.",
            "I love video games with a story. As you've probably noticed from the image above, I enjoy playing Warframe. Some other video games that I enjoy (but not limited to) are: Horizon: Zero Dawn/Forbidden West, Dungeons & Dragons Online, Minecraft, and World of Tanks.",
          ].map((paragraph, index) => (
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
