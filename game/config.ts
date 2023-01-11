// export const server = "http://damascus.kro.kr:5656";

import { createHash } from "crypto";

export const getServer = () =>
  "http://" + location.host.split(":")[0] + ":5656";

export const SHA256 = (msg: string) =>
  createHash("sha256").update(msg).digest("hex");
