import { Avatar, Button, Icon } from "@mui/material";
import Head from "next/head";

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
    credits: "Picture taken by Christina Bellanich",
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
];

const ImageCard = ({ entry }: { entry: ImageEntry }) => (
  <>
    <div
      style={{
        background: "#283334",
        borderRadius: "30px",
        padding: "20px",
        margin: "auto",
        display: "block",
        boxShadow: "10px 20px 50px 10px",
        width: "400px",
      }}
    >
      <Avatar
        alt={entry.title}
        src={entry.src}
        sx={{ width: 300, height: 300 }}
        style={{
          boxShadow: "5px 10px  50px 5px",
          margin: "auto",
        }}
      />
      <div
        style={{
          width: "95%",
        }}
      >
        <h2
          style={{
            paddingTop: "20px",
            color: "white",
            width: "90%",
            textAlign: "center",
            margin: "auto",
          }}
        >
          {entry.title}
        </h2>
        <p
          style={{
            color: "white",
            width: "100%",
            textAlign: "center",
            wordWrap: "normal",
          }}
        >
          {entry.credits}
        </p>
        {entry.url != null ? (
          <>
            <div
              style={{
                textAlign: "center",
                width: "100%",
              }}
            >
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
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        color: "white",
      }}
    >
      <p
        style={{
          fontSize: "60px",
          fontWeight: "bolder",
          borderRadius: "20px",
          display: "inline-block",
          padding: "10px 20px",
        }}
      >
        Image Credits
      </p>
    </div>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "90%",
        margin: "auto",
        gap: "20px",
      }}
    >
      {Values.map((entry) => (
        <ImageCard key={entry.src} entry={entry} />
      ))}
    </div>
  </>
);

export default Content;
