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
      "help [command]"
    );
  }

  public run() {}
}
