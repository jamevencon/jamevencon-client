import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import { Message, runCmd } from "../game/command";

const Home: NextPage<{}> = () => {
  const [content, setContent] = useState<Message[]>([
    { msg: "Welcome to JamEvenCon.", type: "info" },
    { msg: "Let's start your journey.", type: "info" },
    { msg: "type 'help' to check details.\n", type: "info" },
  ]);
  const [input, setInput] = useState("");

  const append = (msg: Message[]) => {
    setContent([...content, ...msg]);
  };

  const clear = () => {
    setContent([{ msg: "Console cleared", type: "italic" }]);
  };

  const execute = (cmd: string) => {
    runCmd(cmd, append, clear);
  };

  useEffect(() => {
    // Remove remaining Enter
    if (input === "\n") setInput("");
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
        <Output content={content} />
        <Input execute={execute} input={input} setInput={setInput} />
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
      `}</style>
    </>
  );
};

export default Home;
