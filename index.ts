import express, { Application } from "express";
import cors from "cors";
import { mainApp } from "./main";
import { dbConfig } from "./utils/dbConfig";
import session from "express-session";
import cookieParser from "cookie-parser";
const app: Application = express();
const PORT: number = 2277;

app.use(cors({ origin: ["*"] }));
app.use(express.json());
app.use(cookieParser("codifyPlatform"));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "codifyPlatform",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600 },
  })
);

mainApp(app);

app.listen(process.env.PORT || PORT, () => {
  console.clear();

  dbConfig();
});
