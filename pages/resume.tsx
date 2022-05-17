import { GitHubAPI } from "libs/github";


const Page = ({user}) => {
  const resume = require('content/resume.json');
  return <></>;
};

export const getStaticProps = async ({ params }) => {

  return {
    props: {
      user: await GitHubAPI.users.getByUsername({
        username: "LittleTealeaf"
      })
    },
  };
};

export default Page;
