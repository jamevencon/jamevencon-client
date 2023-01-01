import { ConsoleSender } from "../command";
import { Executable } from "./Executable";
import { getServer } from "../config";
import axios from "axios";
import md5 from "md5";
import { initSocket, mySocket, name } from "../../socket/socket";
import { io } from "socket.io-client";

interface LoginRes {
  msg: "SUCCESS" | "FAILURE";
}

export class Login extends Executable {
  constructor() {
    super(
      "login",
      ["로그인"],
      [],
      "social",
      "로그인을 진행한 후 서버와 연결을 시도합니다. 화면에 비밀번호가 노출되므로 평소에 사용하지 않는 비밀번호를 사용하기를 권장합니다.",
      "login <username> <password>"
    );
  }

  public async run(
    append: ConsoleSender,
    option: Map<string, string>,
    args: string[]
  ) {
    if (args.length < 2) {
      append([
        {
          msg: "사용법 : login <username> <password>",
          type: "error",
        },
      ]);
      return;
    }

    if (mySocket && name) {
      append([
        {
          msg: "이미 로그인 되어 있습니다. (" + name + ")",
          type: "error",
        },
      ]);
      return;
    }

    const {
      data: { msg },
    } = await axios.post<LoginRes>(getServer() + "/auth/login", {
      username: args[0],
      password: md5(args[0] + args[1]),
    });

    if (msg === "SUCCESS") {
      append([
        {
          msg: "인증에 성공했습니다.",
          type: "success",
        },
        {
          msg: "서버와 연결을 시도합니다.",
          type: "info",
        },
      ]);

      const socket = io(`ws://${getServer().split("://")[1]}`);
      const username = args[0];
      initSocket(socket, username, append);
    } else {
      append([
        {
          msg: "인증에 실패했습니다. username이나 비밀번호가 일치하지 않아서 일 수 있습니다.",
          type: "error",
        },
      ]);
    }
  }
}
