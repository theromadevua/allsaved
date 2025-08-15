import type { IUser } from "../user/IUser";

export interface IAuthResponse {
    user: IUser;
    token: string;
  }