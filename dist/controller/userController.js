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
exports.resetUserPassword = exports.forgetUserPassword = exports.verifyUserAccount = exports.createUser = void 0;
const userMOdel_1 = __importDefault(require("../model/userMOdel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_1 = require("../utils/email");
const crypto_1 = __importDefault(require("crypto"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield userMOdel_1.default.create({
            email,
            password: hashed,
            verifyToken: token,
        });
        (0, email_1.sendEmail)(user);
        return res
            .status(201)
            .json({ message: "created successfully", data: user });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.createUser = createUser;
const verifyUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { token } = req.body;
        const accountUser = yield userMOdel_1.default.findById(userID);
        if ((accountUser === null || accountUser === void 0 ? void 0 : accountUser.verifyToken) === token) {
            const user = yield userMOdel_1.default.findByIdAndUpdate(userID, {
                verifyToken: "",
                verify: true,
            }, { new: true });
            return res
                .status(201)
                .json({ message: "user account verified successfully", data: user });
        }
        else {
            return res.status(404).json({ message: "Invalid token" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.verifyUserAccount = verifyUserAccount;
const forgetUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const getUser = yield userMOdel_1.default.findOne({ email });
        if (getUser && (getUser === null || getUser === void 0 ? void 0 : getUser.verify)) {
            const user = yield userMOdel_1.default.findByIdAndUpdate(getUser === null || getUser === void 0 ? void 0 : getUser._id, {
                verifyToken: token,
            }, { new: true });
            // sendEmail(user);
            return res
                .status(201)
                .json({ message: "created successfully", data: user });
        }
        else {
            return res.status(404).json({ message: "user can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.forgetUserPassword = forgetUserPassword;
const resetUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const { userID } = req.params;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const getUser = yield userMOdel_1.default.findById(userID);
        if (getUser && (getUser === null || getUser === void 0 ? void 0 : getUser.verify) && (getUser === null || getUser === void 0 ? void 0 : getUser.verifyToken) !== "") {
            const user = yield userMOdel_1.default.findByIdAndUpdate(getUser === null || getUser === void 0 ? void 0 : getUser._id, {
                verifyToken: "",
                password: hashed,
            }, { new: true });
            return res
                .status(201)
                .json({ message: "created successfully", data: user });
        }
        else {
            return res.status(404).json({ message: "user can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.resetUserPassword = resetUserPassword;
