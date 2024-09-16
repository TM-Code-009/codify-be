import {
  createUser,
  forgetUserPassword,
  resetUserPassword,
  verifyUserAccount,
} from "../controller/userController";

import { Router } from "express";

const router: Router = Router();

router.route("/register").post(createUser);

router.route("/:userID/verify-account").patch(verifyUserAccount);

router.route("/forget-password").patch(forgetUserPassword);
router.route("/:userID/reset-password").patch(resetUserPassword);

export default router;
