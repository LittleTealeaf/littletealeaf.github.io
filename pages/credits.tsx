import { Avatar, Button } from "@mui/material";
import Head from "next/head";
import css from "styles/pages/credits.module.scss";
import { ImageEntry, ImageCredits } from "content/credits";
import { RenderPresent } from "components/conditional";

const ImageCard = ({ entry }: { entry: ImageEntry }) => (
  <>
    <div className={css.card}>
      <Avatar alt={entry.title} src={entry.src} sx={{ width: 300, height: 300 }} className={css.avatar} />
      <div className={css.content}>
        <h2 className={css.title}>{entry.title}</h2>
        <p className={css.credits}>{entry.credits}</p>
        {RenderPresent(entry.url, () => (
          <>
            <div className={css.buttonHolder}>
              <Button href={entry.url}>View</Button>
            </div>
          </>
        ))}
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
        {ImageCredits.map((entry) => (
          <ImageCard key={entry.src} entry={entry} />
        ))}
      </div>
    </div>
  </>
);

export default Content;
