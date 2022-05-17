import { height } from "@mui/system";
import { AppProps } from "next/app";

export const config = {
  unstable_runtimeJS: false
};

export default function Content({test}) {
  return (
    <>
    <div>
      {test}
    </div>
    </>
  );
}

export const getStaticProps = ({stuff}) => {
  return {
    props: {
      test: "test"
    }
  }
}
