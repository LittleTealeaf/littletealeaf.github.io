export type ImageEntry = {
  src: string;
  credits: string;
  title: string;
  url?: string;
};

export const ImageCredits: Array<ImageEntry> = [
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
  },{
    src: require('assets/images/projects/wordle.png'),
    title: 'Wordle Clone Snippet',
    credits: 'App Created and Screenshot Taken by Thomas Kwashnak (not affiliated with New York Times or the New York Times Wordle)'
  }
];
