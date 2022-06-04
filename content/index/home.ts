import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export type LinkType = {
  key: string;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  href: string;
};

export const Links: Array<LinkType> = [
  {
    key: "github",
    icon: GitHubIcon,
    href: "https://www.github.com/LittleTealeaf",
  },
  {
    key: "linkedin",
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/thomas-kwashnak",
  },
  {
    key: "email",
    icon: EmailIcon,
    href: "mailto:thomaskwashnak@gmail.com",
  },
];

export const Labels: Array<string> = ["Computer Science", "Data Science", "Software Engineering"];
