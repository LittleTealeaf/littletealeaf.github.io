import css from "styles/components/index/home.module.scss";
import { Links, Labels } from "content/index/home";
import { Icon } from "@mui/material";
import { BgImg } from "libs/utils";

const Component = ({}) => (
  <>
    <div
      id="home"
      className={css.component}
      style={{
        background: BgImg(require("assets/images/index/home.jpg"), "no-repeat top center"),
        WebkitBackgroundSize: "cover !important",
      }}
    >
      <div className={css.content}>
        {"Thomas Kwashnak"}
        <hr />
        <div className={css.labels}>
          {Labels.map((label, index) => (
            <p key={index}>{label}</p>
          ))}
        </div>

        <p>{"Student at Quinnipiac University"}</p>
        <ul>
          {Links.map((item) => (
            <li key={item.key}>
              <a target="_blank" href={item.href} className={css.iconholder} rel="noreferrer">
                <Icon component={item.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default Component;
