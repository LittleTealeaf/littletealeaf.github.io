import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";


export type ContactType = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  contact: string;
  href?: string;
};

export type LanguageType = {
  name: string;
  frameworks?: Array<string>;
};

export type EducationType = {
  school: string;
  gpa?: number;
  majors?: Array<string>;
  minors?: Array<string>;
  graduation: string;
};

export type EmploymentType = {
  company: string;
  branch?: string;
  position: string;
  dates: string;
  dateConditional?: string;
  description: string;
};

export type ProjectGroupType = {
    name: string;
    projects: Array<ProjectType>;
}

export type ProjectType = {
    name: string;
    dates: string;
    tasks?: Array<string>;

}

const Lang = (name: string, ...frameworks: string[]): LanguageType => ({
  name,
  frameworks: frameworks.length > 0 ? frameworks : null,
});

export const Contacts: Array<ContactType> = [
  {
    icon: EmailIcon,
    contact: "ThomasKwashnak@gmail.com",
    href: "mailto:thomaskwashnak@gmail.com",
  },
  {
    icon: GitHubIcon,
    contact: "LittleTealeaf",
    href: "https://github.com/LittleTealeaf",
  },
  {
    icon: LinkedInIcon,
    contact: "thomas-kwashnak",
    href: "https://www.linkedin.com/in/thomas-kwashnak",
  },
  {
    icon: LanguageIcon,
    contact: "littletealeaf.github.io",
    href: "https://littletealeaf.github.io",
  },
];

export const Summary: string =
  "Passionate computer and data science student. Experience in many various aspects of programming and data analyzing. Learning focused and always happy to try new things. Well versed in some programming languages for front, back, and data analyzing. ";

export const Languages: Array<LanguageType> = [
  Lang("Python", "Numpy"),
  Lang("Java", "Maven", "Gradle", "JUnit5", "JavaFX", "AWT", "Android", "GSON"),
  Lang("Scala"),
  Lang("Javascript", "Next.js", "React"),
  Lang("CSS", "SCSS"),
  Lang("Typescript"),
  Lang("Bash/Shell"),
  Lang("XML"),
  Lang("JSON"),
  Lang("C#"),
  Lang("TeX/LaTeX"),
  Lang("Markdown", "Github"),
];

export const Skills: Array<string> = [
  "Windows",
  "Linux",
  "Android",
  "Github/Git",
  "Excel",
  "Google Drive",
  "Microsoft Office (365)",
  "SolidWorks",
  "Unity",
  "Visual Studio Code",
  "Intellij",
  "Jira",
  "Android Studio",
  "SQLite",
];
