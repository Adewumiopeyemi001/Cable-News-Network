import _ from 'lodash';
import User from "../Models/users.models.js";
import { errorResMsg, successResMsg } from "../lib/response.js";
import {
  checkExistingPassword,
  checkExistingUser,
} from "../middleware/service.js";
import cloudinary from "../Public/Images/cloudinary.js"; 


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


