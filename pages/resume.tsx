import scss from "styles/pages/resume.module.scss";
import { GitHubAPI } from "libs/github";
import Fab from "@mui/material/Fab";
import cs from "classnames";
import PrintIcon from "@mui/icons-material/Print";
import { Icon } from "@mui/material";
import data from "content/resume.json";

export const config = {
  unstable_runtimeJS: false,
};

const print = () => window.print();

const Header = ({}) => <></>;

const Page = ({}) => (
  <>
    <div className={scss.page}>
      <Header />
      <Fab
        className={scss.print_hide}
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
        }}
        onClick={print}
      >
        <PrintIcon />
      </Fab>
    </div>
  </>
);

export default Page;
