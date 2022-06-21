import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TitleLink = {
  key: string;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  href: string;
};


export type ProjectType = {
    image?: string;
    name: string;
    description: Array<string>;
    github?: GitHubRepo;
    links?: ProjectLinks;
    labels?: Array<string>;
  };

  export type ProjectLinks = {
    github?: string;
    website?: string;
    report?: string;
  };

  export type GitHubRepo = {
    owner: string;
    repo: string;
  };
