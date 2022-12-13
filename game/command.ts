export type ConsoleSender = (msg: Message[]) => void;

export interface Command {}
export interface Message {
  msg: string;
  type: "info" | "warn" | "error" | "success" | "debug" | "italic";
}

export const runCmd = (
  cmd: string,
  sender: ConsoleSender,
  clear: () => void
) => {
  if (cmd === "") return;

  if (cmd === "cls" || cmd === "clear") clear();
  else
    sender([
      {
        msg: `명령 '$령cmd.split(" ")[0]}'을 찾을 수 없습니다.`,
        type: "error",
      },
    ]);
};
