import { Document } from "mongoose";

export default interface IXstreame extends Document {
  nickname: string;
  username: string;
  password: string;
  device_id: string;
  url: string;
  xtreamUserInfo: object;
}

export interface XtreamUserInfo {
  username: string;
  password: string;
}
