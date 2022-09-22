import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  if (req.method === "DELETE") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const messageId = req.query.messageId;
    const room = rooms.find((x) => {
      return x.roomId === roomId;
    });

    if (room == undefined) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      const message = room.messages.find((x) => {
        return x.messageId === messageId;
      });
      if (message == undefined) {
        return res
          .status(404)
          .json({ ok: false, message: "Invalid message id" });
      } else {
        room.messages = room.messages.filter((x) => {
          return messageId != x.messageId;
        });
        writeDB(rooms);
        return res.json({ ok: true });
      }
    }
  }
}
