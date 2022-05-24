import { Avatar, Button, Icon } from "@mui/material";
import Head from "next/head";
import css from "styles/pages/credits.module.scss";

type ImageEntry = {
  src: string;
  credits: string;
  title: string;
  url?: string;
};

const Values: Array<ImageEntry> = [
  {
    src: require("assets/images/index/aboutme.jpg"),
    title: "Hiking Image",
    credits: "Picture taken by a friend",
  },
  {
    src: require("assets/images/index/home.jpg"),
    title: "Warframe Ivara Fashion",
    credits: "Fashion created and Picture taken by Thomas Kwashnak (LittleTealeaf)",
  },
  {
    src: require("assets/images/404.jpg"),
    title: "Enjoying the Drifter View",
    credits: "Scenic Image taken in Warframe by Thomas Kwashnak (LittleTealeaf)",
  },
  {
    src: require("assets/images/index/projects.png"),
    title: "SER-225 Code Snippet",
    credits: "Code written and screenshotted by Thomas Kwashnak",
  },
  {
    src: require("assets/images/projects/ser210final.png"),
    title: "SER-210 Final Product Screenshot",
    credits: "App Created and Image Taken by Thomas Kwashnak",
  },
  {
    src: require("assets/images/projects/ser225project.png"),
    title: "SER-225 Game Screenshot",
    credits: "Original Game (tile art) by Alex Themineur, Developed for course by Thomas Kwashnak, Jake Conrad, Nicholas Tourony, and Ty Hutchison. Screenshot taken by Thomas Kwashnak",
  },
  {
    src: require("assets/images/projects/gdd140datavisualization.png"),
    title: "GDD-140 Data Visualization Project",
    credits: "App Created and Screenshot Taken by Thomas Kwashnak",
  },
];

const ImageCard = ({ entry }: { entry: ImageEntry }) => (
  <>
    <div className={css.card}>
      <Avatar alt={entry.title} src={entry.src} sx={{ width: 300, height: 300 }} className={css.avatar} />
      <div className={css.content}>
        <h2 className={css.title}>{entry.title}</h2>
        <p className={css.credits}>{entry.credits}</p>
        {entry.url != null ? (
          <>
            <div className={css.buttonHolder}>
              <Button href={entry.url}>View Source</Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  </>
);

const Content = ({}) => (
  <>
    <Head>
      <title>Website Credits</title>
    </Head>
    <div className={css.page}>
      <div className={css.header}>
        <p>Image Credits</p>
      </div>
      <div className={css.cardLayout}>
        {Values.map((entry) => (
          <ImageCard key={entry.src} entry={entry} />
        ))}
      </div>
    </div>
  </>
);

export default Content;
