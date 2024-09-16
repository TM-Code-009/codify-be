import { model, Schema } from "mongoose";
import { iBlogdata } from "../utils/interfaces";

const blogModel = new Schema<iBlogdata>(
  {
    video: {
      type: String,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    descimage: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iBlogdata>("blogs", blogModel);
