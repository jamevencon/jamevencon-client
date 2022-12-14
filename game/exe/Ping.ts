import { ConsoleSender } from "../command";
import { Executable } from "./Executable";

export class Ping extends Executable {
  constructor() {
    super(
      "ping",
      ["핑", "지연"],
      [],
      "system",
      "서버와의 지연 시간을 테스트합니다.\n서버에 연결할 수 없으면 에러가 발생합니다.",
      "ping"
    );
  }

  public run(append: ConsoleSender, args: string[]): void {
    append([
      {
        msg: "핑 계산중...",
        type: "italic",
      },
    ]);

    // Why Disappear!!!!!
    setTimeout(() => {
      append([{ msg: "Pong~", type: "info" }]);
      append([{ msg: "Pong~", type: "info" }]);
    }, 1000);
  }
}
