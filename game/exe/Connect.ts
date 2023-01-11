import { ConsoleSender } from "../command";
import { Executable } from "./Executable";
import { io } from "socket.io-client";
import { getServer } from "../config";
import { initSocket } from "../../socket/socket";

export class Connect extends Executable {
  constructor() {
    super(
      "connect",
      ["접속", "연결"],
      [],
      "system",
      "서버에 연결합니다. 주의: 입력한 정보가 그대로 노출되어 비밀번호가 굉장히 취약해질 수 있습니다. 절대 평소에 쓰는 비밀번호를 사용하지 마세요.",
      "connect <username> <password>"
    );
  }

  public run(
    append: ConsoleSender,
    option: Map<string, string>,
    args: string[]
  ): void {
    // TODO connect <username> <secret>
    if (args.length < 1) {
      append([
        {
          msg: "사용법 : connect <username>",
          type: "error",
        },
      ]);
      return;
    }

    const socket = io(`ws://${getServer().split("://")[1]}`);
    const username = args[0];

    initSocket(socket, username, append);

    // socket.on("message", ({ name, message }) => {
    //   append([
    //     {
    //       msg: `[${name}] ${message}`,
    //       type: "info",
    //     },
    //   ]);
    // });

    // socket.emit("message", { name: "YEAHx4", message: "Hello" });
    // socket.emit("message", { name: "YEAHx4", message: "Hello" });
  }
}
