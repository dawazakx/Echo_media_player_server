import { Schema, model, Document } from "mongoose";
import IXstreame from "../interfaces/IXstreame.interface";

const playlistSchema = new Schema<IXstreame>({
  nickname: { type: String, required: true },
  username: { type: String },
  password: { type: String },
  device_id: { type: String },
  url: { type: String, required: true },
  xtreamUserInfo: { type: Object },
  email: { type: String, unique: true },
});

const PlaylistModel = model<IXstreame>("Playlist", playlistSchema);

export default PlaylistModel;
