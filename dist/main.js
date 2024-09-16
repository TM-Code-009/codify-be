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
exports.mainApp = void 0;
const userRouter_1 = __importDefault(require("./router/userRouter"));
const passport_1 = __importDefault(require("passport"));
require("./utils/strategies/localStrategy");
const mainApp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            next();
        });
        const defaultRoute = (req, res) => {
            try {
                return res.status(200).json({
                    message: "Welcome to the default route!",
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "Error",
                });
            }
        };
        app.get("/", defaultRoute);
        app.use("/api", userRouter_1.default);
        // PASSPORT LOGIN
        app.post("/api/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.authenticate("local", (err, user, info) => {
                if (err)
                    return res.status(404).json({ message: err.message });
                if (!user)
                    return res.status(404).json({ message: info });
                return res.status(200).json({
                    message: "Logged in successfully!",
                    data: user,
                });
            })(req, res, next);
        }));
        // BACKUP-PASSPORT LOGIN
        app.post("/api/login/start", passport_1.default.authenticate("local"), function (req, res, next) {
            console.log(req.session);
            console.log(req.user);
            return res.status(200).json({
                message: "Logged in successfully!",
                data: req.user,
            });
        });
    }
    catch (error) {
        console.log("Error: ", error);
    }
});
exports.mainApp = mainApp;
