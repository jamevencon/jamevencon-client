import { GetUsers, GET_USERS, HELLO, WELCOME } from "./socket.type";
import { Socket } from "socket.io-client";
import { ConsoleSender } from "../game/command";

export let mySocket: Socket;
export let name: string;

export const initSocket = (
  socket: Socket,
  username: string,
  append: ConsoleSender
) => {
  mySocket = socket;
  name = username;

  socket.emit(HELLO, {
    username: name,
  });

  socket.on(WELCOME, () => {
    append([{ msg: "서버에 연결되었습니다.", type: "success" }]);
  });

  socket.on(GET_USERS, ({ usernames }: GetUsers) => {
    append([
      {
        msg: `현재 접속한 유저 목록(${usernames.length}):\n${usernames.join(
          ", "
        )}`,
        type: "info",
      },
    ]);
  });
};

export const disconnect = (append: ConsoleSender) => {
  if (!name || !mySocket) {
    append([
      {
        msg: "서버와 연결되어있지 않습니다.",
        type: "error",
      },
    ]);
    return;
  }

  mySocket.disconnect();
  mySocket;
  name = "";

  append([
    {
      msg: "서버와의 연결이 끊어졌습니다.",
      type: "info",
    },
  ]);
};
