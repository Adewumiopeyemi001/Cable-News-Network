import express from "express";
import { forgetPassword, login, resetPassword, signup } from "../Controller/user.controllers.js";
import upload from "../Public/Images/multer.js"

const router = express.Router();


router.post("/signup", upload.single("profilePicture"), signup);
router.post("/login",  login);
router.post("/forgotpassword", forgetPassword);
router.post("/resetpassword/:token", resetPassword);

export default router;
