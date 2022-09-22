import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  const roomId = req.query.roomId;
  if (req.method === "GET") {
    const rooms = readDB();
    const room = rooms.find((x) => {
      return x.roomId === roomId;
    });

    if (room == undefined) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      return res.json({ ok: true, messages: room.messages });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();
    const room = rooms.find((x) => {
      return x.roomId === roomId;
    });

    if (room == undefined) {
      return res.status(404).json({ ok: false, message: "Invalid Room" });
    } else if (typeof req.body.text != "string") {
      return res.status(400).json({ ok: false, message: "Invalid text input" });
    } else {
      const newText = {
        messageId: uuidv4(),
        text: req.body.text,
      };
      room.messages.push(newText);
      writeDB(rooms);
      return res.json({ ok: true, room });
    }

    //read request body
    const text = req.body.text;

    //create new id
    const newId = uuidv4();
  }
}
