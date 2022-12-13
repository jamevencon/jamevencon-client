import { ConsoleSender } from "./../command";
import { Executable } from "./Executable";

export class Help extends Executable {
  constructor() {
    super(
      "help",
      ["도움", "도움말"],
      [],
      "system",
      `명령어, 시스템 등 각종 도움말을 표시합니다.
      명령어에서 사용할 수 있는 옵션을 검색할 수 있습니다.`,
      "help [command | category]"
    );
  }

  public run(sender: ConsoleSender, args: string[]) {
    // TODO help ping, help combat 등 구현하기
    // TODO 방향키로 history 불러오기
    // TODO Option 으로 parameter 구현하기

    if (args.length === 0) {
      sender([
        {
          msg: `\n\n${this.name}\n
          ${this.desc}\n
          사용법 : ${this.usage}`,
          type: "info",
        },
      ]);
    }
  }
}
