import axios from "axios";
import { disconnect, isLogin, name as username } from "../../../socket/socket";
import { ConsoleSender } from "../../command";
import { getServer, SHA256 } from "../../config";
import { Executable } from "../Executable";

interface DeleteRes {
  msg: "SUCCESS" | "NOT_FOUND";
}

export class DeleteAcc extends Executable {
  constructor() {
    super(
      "delete-account",
      ["탈퇴"],
      [],
      "social",
      "로그인 되어 있는 계정의 데이터를 삭제합니다. ",
      "delete-account <password>"
    );
  }

  public async run(
    append: ConsoleSender,
    option: Map<string, string>,
    args: string[]
  ) {
    if (args.length < 1) {
      append([
        {
          msg: "사용법 : delete-account <password>",
          type: "error",
        },
      ]);
      return;
    }

    if (!isLogin) {
      append([
        {
          msg: "서버에 연결되어 있지 않거나 로그인 되어 있지 않습니다. help login으로 자세한 정보를 확인할 수 있습니다.",
          type: "error",
        },
      ]);
      return;
    }

    const res = (
      await axios.post<DeleteRes>(getServer() + "/auth/delete", {
        username: username,
        password: SHA256(username + args[0]),
      })
    ).data;

    if (res.msg === "NOT_FOUND") {
      append([
        {
          msg: "비밀번호가 일치하지 않습니다.",
          type: "error",
        },
      ]);
      return;
    } else {
      append([
        {
          msg: "계정을 삭제합니다.",
          type: "warn",
        },
      ]);
      disconnect(append);
    }
  }
}
