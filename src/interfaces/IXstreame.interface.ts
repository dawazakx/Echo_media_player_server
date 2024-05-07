interface Device {
  id: string;
  type: string;
}

export default interface IXstreame {
  nickname: string;
  username: string;
  password: string;
  device: Device;
  url: string;
}
