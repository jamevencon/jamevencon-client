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

        @keyframes FrontBlink {
          0% {
            opacity: 40%;
          }
          50% {
            opacity: 100%;
          }
          100% {
            opacity: 40%;
          }
        }

        @keyframes BackBlink {
          0% {
            opacity: 100%;
          }
          50% {
            opacity: 40%;
          }
          100% {
            opacity: 100%;
          }
        }

        .bg-front {
          background-image: url("/background-star-back.png");
          animation: FrontBlink 2s infinite;
        }

        .bg-back {
          background-image: url("/background-star-front.png");
          animation: BackBlink 2s infinite;
        }
      `}</style>
    </>
  );
};

export default Home;
