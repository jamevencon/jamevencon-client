import { Ping } from "./exe/Ping";
import { Executable } from "./exe/Executable";
import { Help } from "./exe/Help";
import { Connect } from "./exe/Connect";
import { Register } from "./exe/auth/Register";
import { Users } from "./exe/auth/Users";
import { Login } from "./exe/auth/Login";
import { Logout } from "./exe/auth/Logout";
import { DeleteAcc } from "./exe/auth/DeleteAcc";
import { Alter } from "./exe/auth/Alter";

export type ConsoleSender = (msg: Message[]) => void;

export interface Command {}
export interface Message {
  msg: string;
  type: "info" | "warn" | "error" | "success" | "debug" | "italic";
}

export const commands: Executable[] = [
  new Help(),
  new Ping(),
  // new Connect(),
  new Users(),
  new Register(),
  new Login(),
  new Logout(),
  new DeleteAcc(),
  new Alter(),
];

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

    const args = [...cmd.split(" ").slice(1)];
    const option = new Map<string, string>();

    let fail = false;

    if (args.length !== 0) {
      commands[search[0]].params.forEach((p) => {
        if (fail) return;

        if (p.options.map((v) => "-" + v).includes(args[0])) {
          if (p.needValue) {
            if (args.length < 2) {
              // Only key
              fail = true;
              sender([
                {
                  msg: `옵션 ${args[0]}에 값이 제공되지 않았습니다.`,
                  type: "error",
                },
              ]);
            } else {
              option.set(p.options[0], args[1]);
              args.shift();
              args.shift();
            }
          } else {
            option.set(p.options[0], "");
            args.shift();
          }
        }
      });
    }

    if (!fail) commands[search[0]].run(sender, option, args);
  }
};
