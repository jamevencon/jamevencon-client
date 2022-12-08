import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage<{}> = () => {
  const [content, setContent] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(input.trim());
  }, [input]);

  return (
    <>
      <Head>
        <title>JamEvenCon</title>
      </Head>

      <div className="bg">
        <div className="bg-front"></div>
        <div className="bg-back"></div>
      </div>

      <div className="main">
        <div className="up">
          {content.map((v, i) => (
            <div className="body" key={i}>
              {v}
            </div>
          ))}
        </div>
        <textarea
          placeholder="Start your journey"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setInput("");
            }
          }}
        ></textarea>
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

        .main {
          display: flex;
          flex-direction: column;
          max-width: 1280px;
          height: 100vh;
          margin: 0 auto;
        }

        .main > div,
        .main > textarea {
          background-color: rgb(10, 10, 27, 0.6);
        }

        .up {
          height: 80%;
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          border-radius: 15px;
          overflow: auto;
        }

        textarea {
          height: 15%;
          color: white;
          font-size: 1.5rem;
          overflow-x: scroll;
          word-break: break-all;
          border: none;
          outline: none;
        }
      `}</style>
    </>
  );
};

export default Home;
