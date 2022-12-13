import { NextPage } from "next";

interface Props {
  input: string;
  setInput(str: string): any;
  execute(str: string): any;
}

const Input: NextPage<Props> = ({ execute, input, setInput }) => (
  <>
    <textarea
      placeholder="Start your journey"
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onKeyDown={(e) => {
        // This will allow for non-english word
        // (especially composition letters) to be typed properly
        if (e.nativeEvent.isComposing) return;

        if (e.key === "Enter") {
          execute(input.trim());
          setInput("");
        }
      }}
    ></textarea>

    <style jsx>
      {`
        textarea {
          background-color: rgb(10, 10, 27, 0.6);
          font-family: D2Coding, Consolas;
          height: 15%;
          color: white;
          font-size: 1.5rem;
          overflow-x: scroll;
          word-break: break-all;
          border: none;
          outline: none;
        }
      `}
    </style>
  </>
);

export default Input;
