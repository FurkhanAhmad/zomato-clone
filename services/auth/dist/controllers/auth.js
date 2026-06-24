import User from "../model/User.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middleware/middleware.js";
import { oauth2client } from "../config/googleConfig.js";
import axios from "axios";
export const loginUser = TryCatch(async (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({
            messsage: "Authorization code is required",
        });
    }
    //  const googleRes=await oauth2client.getToken(code)
    //      oauth2client.setCredentials(googleRes.tokens)
    const googleRes = await oauth2client.getToken(code);
    if (!googleRes.tokens.access_token) {
        return res.status(400).json({ message: "Failed to get access token" });
    }
    const userRes = await axios(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
    const { email, name, picture } = userRes.data;
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({
            name, email, image: picture
        });
    }
    const token = jwt.sign({ user }, "kkekeke493939ekkrkr", {
        expiresIn: "15d"
    });
    res.status(200).json({
        message: "Logged Success",
        token,
        user
    });
});
const allowedRoles = ["customer", "rider", "seller"];
export const addUserRole = TryCatch(async (req, res) => {
    if (!req.user?._id) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const { role } = req.body;
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({
            message: "Invalid role",
        });
    }
    const user = await User.findByIdAndUpdate(req.user._id, { role }, { new: true });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    const userPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role
    };
    const token = jwt.sign({ user: userPayload }, "kkekeke493939ekkrkr", { expiresIn: "15d" });
    res.json({ user, token });
});
export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    res.json(user);
});
