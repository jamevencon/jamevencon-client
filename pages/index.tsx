import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>JamEvenCon</title>
      </Head>

      <div className="bg">
        <div className="bg-front"></div>
        <div className="bg-back"></div>
      </div>

      <style jsx>{`
        .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .bg > div {
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: 1500px 750px;
        }

        .bg-front {
          background-image: url("/background-star-back.png");
        }

        .bg-back {
          background-image: url("/background-star-front.png");
        }
      `}</style>
    </>
  );
};

export default Home;
