import { ConsoleSender } from "../../command";
import { Executable } from "../Executable";
import { getServer, SHA256 } from "../../config";
import axios from "axios";

interface RegisterRes {
  msg: "TAKEN_USERNAME" | "SUCCESS";
}

export class Register extends Executable {
  constructor() {
    super(
      "register",
      ["가입", "회원가입"],
      [],
      "social",
      "회원가입을 진행합니다. 계정 정보가 데이터베이스에 저장됩니다. 화면에 비밀번호가 노출되므로 평소에 사용하지 않는 비밀번호를 사용하기를 권장합니다.",
      "register <username> <password>"
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
          msg: "사용법 : register <username> <password>",
          type: "error",
        },
      ]);
      return;
    }

    const {
      data: { msg },
    } = await axios.post<RegisterRes>(getServer() + "/auth/register", {
      username: args[0],
      password: SHA256(args[0] + args[1]),
    });

    if (msg === "TAKEN_USERNAME") {
      append([
        {
          msg: "사용할 수 없는 username입니다.",
          type: "error",
        },
      ]);
    } else {
      append([
        {
          msg: "회원가입에 성공했습니다. 로그인 후 이용하실 수 있습니다.",
          type: "success",
        },
      ]);
    }
  }
}
