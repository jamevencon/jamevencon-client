import { NextPage } from "next";
import { useEffect, useState } from "react";
import { commands } from "../game/command";

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
  const [tabIndex, setTab] = useState(0);
  const [lastInput, setLast] = useState("");

  return (
    <>
      <textarea
        placeholder="Start your journey"
        value={input}
        onChange={(e) => {
          setLast(e.target.value);
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          // This will allow for non-english word
          // (especially composition letters) to be typed properly
          if (e.nativeEvent.isComposing) return;

          if (e.key === "Tab") {
            e.preventDefault();

            if (input.split(" ").length === 1) {
              // Search commands
              const cmds = [
                ...commands.map((v) => v.name),
                ...commands
                  .map((v) => [...v.aliases])
                  .reduce((a, b) => [...a, ...b]),
              ].filter((v) => v.startsWith(lastInput.trim()));

              if (cmds.length === 0) return;

              if (lastInput === input) {
                // Newly typed
                setTab(0);
                setInput(cmds[0]);
              } else {
                setInput(cmds[tabIndex]);
              }

              if (cmds.length - 1 > tabIndex) setTab(tabIndex + 1);
              else setTab(0);
            }
          }

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
