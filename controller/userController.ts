import { Request, Response } from "express";
import userMOdel from "../model/userMOdel";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/email";
import crypto from "crypto";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;
    const salt = await bcrypt.genSalt(10);

    const token = crypto.randomBytes(3).toString("hex");

    const hashed = await bcrypt.hash(password, salt);
    const user = await userMOdel.create({
      email,
      userName,
      password: hashed,
      verifyToken: token,
    });

    sendEmail(user);

    return res
      .status(201)
      .json({ message: "created successfully", data: user });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const verifyUserAccount = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { token } = req.body;

    const accountUser = await userMOdel.findById(userID);

    if (accountUser?.verifyToken === token) {
      const user = await userMOdel.findByIdAndUpdate(
        userID,
        {
          verifyToken: "",
          verify: true,
        },
        { new: true }
      );

      return res
        .status(201)
        .json({ message: "user account verified successfully", data: user });
    } else {
      return res.status(404).json({ message: "Invalid token" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const forgetUserPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const token = crypto.randomBytes(3).toString("hex");

    const getUser = await userMOdel.findOne({ email });

    if (getUser && getUser?.verify) {
      const user = await userMOdel.findByIdAndUpdate(
        getUser?._id,
        {
          verifyToken: token,
        },
        { new: true }
      );

      // sendEmail(user);

      return res
        .status(201)
        .json({ message: "created successfully", data: user });
    } else {
      return res.status(404).json({ message: "user can't be found" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const resetUserPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const { userID } = req.params;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const getUser = await userMOdel.findById(userID);

    if (getUser && getUser?.verify && getUser?.verifyToken !== "") {
      const user = await userMOdel.findByIdAndUpdate(
        getUser?._id,
        {
          verifyToken: "",
          password: hashed,
        },
        { new: true }
      );

      return res
        .status(201)
        .json({ message: "created successfully", data: user });
    } else {
      return res.status(404).json({ message: "user can't be found" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
