import { commands, ConsoleSender, Message, searchCommand } from "./../command";
import { categoryStr, Executable, isCategory } from "./Executable";

export class Help extends Executable {
  constructor() {
    super(
      "help",
      ["도움", "도움말"],
      [
        {
          options: ["q", "quiet"],
          description: "카테고리의 명령의 이름만을 출력합니다.",
          needValue: false,
        },
        {
          options: ["c", "check"],
          description:
            "입력된 값이 유효한 카테고리인지, 명령인지 확인합니다. 유효하지 않으면 오류가 발생합니다.",
          needValue: true,
        },
      ],
      "system",
      `명령어, 시스템 등 각종 도움말을 표시합니다.
      명령어에서 사용할 수 있는 옵션을 검색할 수 있습니다.`,
      "help [command | category]"
    );
  }

  public run(sender: ConsoleSender, args: string[]) {
    if (args.length === 0) {
      sender([
        {
          msg: `${this.name}\n
          ${this.desc}\n
          사용법 : ${this.usage}
          카테고리에는 ${categoryStr.join(", ")} 이 있습니다.`,
          type: "info",
        },
      ]);
    } else {
      if (isCategory(args[0])) {
        const filter = commands.filter((v) => v.category === args[0]);

        sender(
          filter.map(
            (v): Message => ({
              msg: `${v.name} - ${v.desc}`,
              type: "info",
            })
          )
        );
      } else {
        const command = searchCommand(args[0]);

        if (command.length < 1) {
          sender([
            {
              msg: `명령 또는 카테고리 ${args[0]}을(를) 찾을 수 없습니다.`,
              type: "error",
            },
          ]);
          return;
        } else if (command.length > 1) {
          sender([
            {
              msg: `명령 ${args[0]}에 대한 검색 결과가 ${command.length}개 입니다.`,
              type: "warn",
            },
          ]);
        }

        // Print help
        const cmd = commands[command[0]];
        sender([
          { msg: cmd.name, type: "info" },
          { msg: `${cmd.aliases.join(", ")}`, type: "italic" },
          { msg: `\n${cmd.desc}\n`, type: "info" },
          ...cmd.params.map(
            (p): Message => ({
              msg: `${p.options.map((v) => "-" + v).join(" ")}${
                p.needValue ? " <value>" : ""
              }\t${p.description}`,
              type: "info",
            })
          ),
          { msg: `\n사용법 : ${cmd.usage}`, type: "info" },
        ]);
      }
    }
  }
}
