import { ConsoleSender } from "../command";
import { Executable } from "./Executable";
import { getServer } from "../config";
import axios from "axios";
import md5 from "md5";
import { disconnect, initSocket } from "../../socket/socket";
import { io } from "socket.io-client";

export class Logout extends Executable {
  constructor() {
    super(
      "logout",
      ["로그아웃"],
      [],
      "system",
      "서버와 연결을 끊고 로그아웃합니다.",
      "logout"
    );
  }

  public async run(
    append: ConsoleSender,
    option: Map<string, string>,
    args: string[]
  ) {
    disconnect(append);
  }
}
