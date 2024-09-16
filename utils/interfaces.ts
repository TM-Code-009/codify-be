import { Document } from "mongoose";

interface iUser {
  userName?: string;
  email?: string;
  password?: string;
  verifyToken?: string;
  verify?: boolean;
}

export interface iUserData extends iUser, Document {}

interface iBlog {
  title: string;
  video: string;
  desc: string;
  image: string;
  descimage: string;
  content: string;
}
export interface iBlogdata extends iBlog, Document {}
