import { Executable } from "./exe/Executable";
import { Help } from "./exe/Help";

export type ConsoleSender = (msg: Message[]) => void;

export interface Command {}
export interface Message {
  msg: string;
  type: "info" | "warn" | "error" | "success" | "debug" | "italic";
}

export const commands: Executable[] = [new Help()];

export const searchCommand = (search: string) => {
  const result: number[] = [];

  for (let i = 0; i < commands.length; i++) {
    if (commands[i].name === search || commands[i].aliases.includes(search)) {
      result.push(i);
    }
  }

  return result;
};

export const runCmd = (
  cmd: string,
  sender: ConsoleSender,
  clear: () => void
) => {
  if (cmd === "") return;

  const command = cmd.split(" ")[0];

  if (cmd === "cls" || cmd === "clear") clear();
  else {
    const search = searchCommand(command);

    if (search.length > 1) {
      // Found multiple aliase match
      sender([
        {
          msg: `검색한 명령 ${command}에 대해 ${
            search.length
          }개의 결과가 있습니다.\n${search
            .map((v) => commands[v].name)
            .join(", ")}`,
          type: "debug",
        },
      ]);
    } else if (search.length === 0) {
      sender([
        {
          msg: `명령 '${command}'을(를) 찾을 수 없습니다.`,
          type: "error",
        },
      ]);

      return;
    }

    commands[search[0]].run(sender, cmd.split(" ").slice(1));
  }
};
