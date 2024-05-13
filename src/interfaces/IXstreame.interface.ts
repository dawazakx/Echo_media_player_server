import { Document } from "mongoose";

export default interface IXstreame extends Document {
  nickname: string;
  username: string;
  password: string;
  device_id: string;
  url: string;
  xtreamUserInfo: object;
}
