import { User } from "../models/user.model.js";
// to hash the password 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//req = request, res = response 

// REGISTER 
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // missing fields 
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // check user doesnt already exist 
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }

        // hash the password 
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is length of hashing 

        // now we create user with the above fields 
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        });

        // Account created msg 
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // missing fields 
        if (!(email || password || role)) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        // find if email exists in the database 
        let user = await User.findOne({ email });

        // not found
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        };

        // check if the role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with chosen role",
                success: false
            })
        };

        // Generate token 
        const tokenData = {
            userId: user._id,
            role: user.role
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Create a user 
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // Store the token in cookie 
        // token name, token and time in ms, only on
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// LOG OUT
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// UPDATE PROFILE 
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        //const file = req.file;

        if (!(fullname || email || phoneNumber || bio || skills)) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        // cloudinary 
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // convert string skills to array 
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; // comes from middleware authentication
        let user = await User.findById(userId);

        // No user found
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        // Update data if found
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // resume 
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // Save cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        // Save changesc 
        await user.save();


        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }


        // Updation done
        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}