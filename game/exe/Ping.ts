import axios, { AxiosError } from "axios";
import { error } from "console";
import { ConsoleSender } from "../command";
import { getServer } from "../config";
import { Executable } from "./Executable";

interface PingRes {
  status: "online" | "offline";
}

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

  public run(
    append: ConsoleSender,
    option: Map<string, string>,
    args: string[]
  ): void {
    append([{ msg: "핑을 측정하는 중...", type: "italic" }]);

    const start = Date.now();
    axios
      .get<PingRes>(`${getServer()}/ping`)
      .then((res) => {
        const end = Date.now();
        append([{ msg: `${end - start}ms`, type: "success" }]);
      })
      .catch((err: AxiosError) => {
        append([
          {
            msg: `에러가 발생했습니다.\nstatus: ${err.code}\n${err.toString()}`,
            type: "error",
          },
        ]);
      });
  }
}
