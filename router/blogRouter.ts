import { Router } from "express";
import { createblog, readAllblog } from "../controller/blogcontroller";

const router: Router = Router();

router.route("/create-blog").post(createblog);

router.route("/get-all-blog").get(readAllblog);

export default router;
