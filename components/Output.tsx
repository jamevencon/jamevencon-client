import { NextPage } from "next";
import { MutableRefObject } from "react";
import { Message } from "../game/command";

interface Props {
  content: Message[];
  scrollRef: MutableRefObject<HTMLDivElement | null>;
}

const Output: NextPage<Props> = ({ content, scrollRef: rref }) => (
  <>
    <div className="up">
      {content.map((v, i) => (
        <div className={`body ${v.type}`} key={i}>
          {v.msg.split("\n").map((str, k) => (
            <p key={`${i}-${k}`}>{str}</p>
          ))}
        </div>
      ))}
      <div
        ref={rref as MutableRefObject<HTMLDivElement>}
        className="scroller"
      ></div>
    </div>

    <style jsx>{`
      .up {
        background-color: rgb(10, 10, 27, 0.6);
        font-family: D2Coding, Consolas;
        height: 80%;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        overflow: auto;
        color: white;
        font-size: 1.2rem;
        overflow-y: scroll;
      }

      .body {
        margin-bottom: 5px;
      }

      .error {
        background-color: rgba(255, 0, 0, 0.3);
      }

      .warn {
        background-color: rgba(255, 166, 0, 0.3);
      }

      .success {
        background-color: rgba(172, 255, 47, 0.3);
      }

      .debug {
        background-color: rgba(128, 128, 128, 0.3);
      }

      .italic {
        font-style: italic;
        color: grey;
      }

      p {
        display: block;
        min-height: 1rem;
      }
    `}</style>
  </>
);

export default Output;
