"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const GOOGLE_REFRESH_TOKEN = "1//04IFsTNSRYpifCgYIARAAGAQSNwF-L9IrQtk-MlkfLoRPTLeP5FSOQzJrACcEX_eb1cJvCzxgPB2RN2lDMrOit74TF1YMMp4PVjs";
const GOOGLE_CLIENT = "76597312158-nvjq3tqe0489m3upu0flchdbu9tom9nt.apps.googleusercontent.com";
const GOOGLE_URL = "https://developers.google.com/oauthplayground";
const GOOGLE_SECRET_KEY = "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";
const USER_MAIL = "ghettodeveloper@gmail.com";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_CLIENT, GOOGLE_SECRET_KEY, GOOGLE_URL);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
const sendEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: USER_MAIL,
                clientId: GOOGLE_CLIENT,
                clientSecret: GOOGLE_SECRET_KEY,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken,
            },
        });
        const mailOptions = {
            from: `GhettoDev <${USER_MAIL}>`,
            to: user === null || user === void 0 ? void 0 : user.email,
            subject: "Test Email",
            text: "This is a test email",
            html: `<b>This is a test email: ${user === null || user === void 0 ? void 0 : user.verifyToken}</b>`,
        };
        yield transporter.sendMail(mailOptions).then(() => {
            console.log("Email sent successfully");
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmail = sendEmail;
