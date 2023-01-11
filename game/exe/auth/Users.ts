import { isLogin, mySocket } from "../../../socket/socket";
import { GET_USERS } from "../../../socket/socket.type";
import { ConsoleSender } from "../../command";
import { Executable } from "../Executable";

export class Users extends Executable {
  constructor() {
    super(
      "users",
      ["유저목록", "유저들", "동접자", "접속자"],
      [],
      "social",
      "접속해 있는 유저의 닉네임 목록을 살펴봅니다.",
      "users"
    );
  }

  run(
    append: ConsoleSender,
    option: Map<string, string>,
    args: string[]
  ): void {
    if (!isLogin()) {
      append([
        {
          msg: "서버에 접속하지 않았습니다.\n참고: help login",
          type: "error",
        },
      ]);
      return;
    }
    mySocket.emit(GET_USERS);
  }
}
