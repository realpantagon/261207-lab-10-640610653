import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();
  return res.json({
    ok: true,
    rooms: rooms.map((x) => {
      return {
        roomId: x.roomId,
        roomName: x.roomName,
      };
    }),
  });
}
