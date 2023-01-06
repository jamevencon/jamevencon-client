import { ConsoleSender } from "../../command";
import { Executable } from "../Executable";
import { disconnect, initSocket } from "../../../socket/socket";

export class Logout extends Executable {
  constructor() {
    super(
      "logout",
      ["로그아웃"],
      [],
      "social",
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
