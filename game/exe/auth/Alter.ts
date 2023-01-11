import axios from "axios";
import { disconnect, isLogin, name as username } from "../../../socket/socket";
import { ConsoleSender } from "../../command";
import { getServer, SHA256 } from "../../config";
import { Executable } from "../Executable";

const userKeys = ["username", "password", "bio"];
interface Res {
  msg: "INVALID_KEY" | "INVALID_CREDENTIALS" | "SUCCESS";
}

export class Alter extends Executable {
  constructor() {
    super(
      "alter",
      ["수정", "정보수정", "프로필수정"],
      [],
      "social",
      "프로필을 수정합니다. 사용할 수 있는 key는 " +
        userKeys.join(", ") +
        "가 있습니다.",
      "alter <key> <value> <password>"
    );
  }

  public async run(
    append: ConsoleSender,
    option: Map<string, string>,
    args: string[]
  ) {
    if (!isLogin()) {
      append([
        {
          msg: `서버에 연결되어 있지 않습니다.`,
          type: "error",
        },
      ]);
      return;
    }
    if (args.length < 3) {
      append([
        {
          msg: `사용법 : alter <key> <password>\nkey는 ${userKeys.join(
            ", "
          )}을 사용할 수 있습니다.`,
          type: "error",
        },
      ]);
      return;
    }

    const data = {
      key: args[0],
      value: args[1],
      username,
      password: SHA256(username + args[2]),
      newPw: "",
    };

    if (args[0] === "username") {
      data.newPw = SHA256(args[1] + args[2]);
    } else if (args[0] === "password") {
      data.value = SHA256(username + args[1]);
    }

    const { msg } = (await axios.post<Res>(getServer() + "/auth/alter", data))
      .data;

    if (msg === "INVALID_CREDENTIALS")
      append([
        {
          msg: "비밀번호가 일치하지 않습니다.",
          type: "error",
        },
      ]);
    else if (msg === "INVALID_KEY")
      append([
        {
          msg: "유효하지 않은 key입니다.",
          type: "error",
        },
      ]);
    else if (msg === "SUCCESS") {
      append([
        {
          msg: "성공적으로 변경되었습니다.",
          type: "success",
        },
      ]);

      if (args[0] === "username" || args[0] === "password") {
        append([
          {
            msg: "다시 로그인 해주세요.",
            type: "info",
          },
        ]);
        disconnect(append);
      }
    }
  }
}
