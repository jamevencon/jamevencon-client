import { NextPage } from "next";
import { useEffect } from "react";

interface Props {
  input: string;
  setInput(str: string): any;
  execute(str: string): any;
  useFormer(): any;
  useLatter(): any;
  newLine(): any;
}

const Input: NextPage<Props> = ({
  execute,
  input,
  setInput,
  useFormer,
  useLatter,
  newLine,
}) => {
  // In dev server, change state executes twice.
  // So, \n will be appended twice.
  useEffect(() => {
    if (input.endsWith("\n\n")) {
      setInput(input.trimEnd() + "\n");
    }
  }, [input]);

  return (
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
            if (e.shiftKey) {
              setInput(input + "\n");
              return;
            }
            if (input === "") {
              newLine();
              return;
            }

            execute(input.trim());
            setInput("");
          } else if (e.key === "ArrowUp") useFormer();
          else if (e.key === "ArrowDown") useLatter();
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
};

export default Input;
