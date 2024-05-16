import _ from 'lodash';
import User from "../Models/users.models.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { errorResMsg, successResMsg } from "../lib/response.js";
import {
  checkExistingPassword,
  checkExistingUser,
  checkExistingUserToken,
} from "../middleware/service.js";
import cloudinary from "../Public/Images/cloudinary.js"; 
import { v4 as uuidv4 } from "uuid";
import emailSenderTemplate from "../middleware/emails.js";
import ejs from "ejs";

export const signup = async (req, res) => { 
    try {
        const { firstName, lastName, email, password, role } = req.body;

        const profilePicture = req.file;
     
        if (!firstName || !lastName || !email || !password  || !role) {
            return errorResMsg(res, 400, "Please fill all the fields");
        }
        const existingUser = await checkExistingUser(email);
        if (existingUser) {
            return errorResMsg(res, 400, "User already exists");
      }
       if (!profilePicture) {
         return errorResMsg(res, 400, "Profile picture is required");
       }
       const result = await cloudinary.v2.uploader.upload(profilePicture.path);
      
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          password,
          profilePicture: result.secure_url, // Store Cloudinary URL
          role,
        });

        const selectedUser = _.pick(newUser, [
          "firstName",
          "lastName",
          "email",
          "role",
          "profilePicture",
        ]);

         return successResMsg(res, 201, {
           success: true,
           newUser: selectedUser,
           message: "User created successfully",
         });
    } catch (error) {
        console.error(error);
        return errorResMsg(res, 500, {
          error: error.message,
          message: "Internal Server Error",
        });
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email ||!password) {
      return errorResMsg(res, 400, "Please enter your email address and password");
    }

    const user = await checkExistingUser(email);
    
    if (!user) {
      return errorResMsg(res, 400, "User not found");
    }

    const passwordMatch = await checkExistingPassword(password, user);
    if (!passwordMatch) {
      return errorResMsg(res, 400, "Password Does Not Match");
    }

    const token = user.generateAuthToken();

    return successResMsg(res, 200, {
      success: true,
      data: {
        token,
        role: user.role,
      }
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal Server Error",
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return errorResMsg(res, 400, "Please Input Your Email");
    }

    const user = await checkExistingUser(email);
    if (!user) {
      return errorResMsg(res, 400, "User not found");
    }

    // Check if there's already an unexpired reset token
    if (user.resetPasswordToken && user.resetPasswordExpires > Date.now()) {
      return successResMsg(res, 200, {
        success: true,
        resetPasswordToken: user.resetPasswordToken,
        message: "A reset token is already sent. Please check your email.",
      });
    }

    // Generate a new token for password reset
    const token = uuidv4(); // Generate UUID token

    // Save the new token and expiration time in the user document
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expiration time (1 hour)

    await user.save();

    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDir = dirname(currentFilePath);
    const templatePath = path.join(
      currentDir,
      "../Public/emails/forgetpassword.ejs"
    );

    await ejs.renderFile(
      templatePath,
      {
        title: `Reset Your Password`,
        body: "Welcome",
        resetPasswordToken: token,
      },
      async (err, data) => {
        await emailSenderTemplate(data, "Reset Your Password", email);
      }
    );

    return successResMsg(res, 200, {
      success: true,
      resetPasswordToken: token,
      message: "Please check your email to reset your password",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Error resetting your password",
    });
  }
};

export const resetPassword = async (req, res) => { 
  try {
    const token = req.params.token;
    const { newPassword, confirmPassword } = req.body;
    if (!token) {
      return errorResMsg(res, 400, "Please Input Your Reset Token");
    }
    const user = await checkExistingUserToken({ resetPasswordToken: token });
    if (!user) {
      return errorResMsg(res, 400, "User not found");
    }
    if (newPassword!== confirmPassword) {
      return errorResMsg(res, 400, "Passwords do not match");
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDir = dirname(currentFilePath);
    const templatePath = path.join(
      currentDir,
      "../Public/emails/resetpassword.ejs"
    );

    await ejs.renderFile(
      templatePath,
      {
        title: `Hello ${user.userName},`,
        body: "Password Reset Successfully, Please Login",
      },
      async (err, data) => {
        await emailSenderTemplate(
          data,
          "Password Reset Successfully",
          user.email
        );
      }
    );

    return successResMsg(res, 200, {
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Error resetting your password",
    });
    
  }
};


