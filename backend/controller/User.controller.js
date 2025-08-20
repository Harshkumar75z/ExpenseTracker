import User from "../Models/User.Models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success : false
            });
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                message: "User already exists",
                success : false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ fullname, email, password:hashedPassword });
        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success : true,
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            success : false,
            error: error.message
        });
    }
};

export const loginUser = async(req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
    }

    const existuser = await User.findOne({email});
    if(!existuser){
        return res.json({
            message : "User doesn't exist",
            success : false
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, existuser.password);
    if(!isPasswordMatch){
        return res.status(200).json({
            message : "Incorrect email or password",
            success : false,
        });
    }

    const tokendata = {
        userId: existuser._id
    };

    const token = jwt.sign(tokendata, process.env.JWT_SECRET, { expiresIn: "1d" })
    return res.cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly : true})
        .status(200)
        .json({
            message : `Welcome back ${existuser.fullname}`,
            user : {
                name : existuser.fullname,
                email : existuser.email,
                id : existuser._id
            },
            success : true
        })
    }


export const logoutuser = async (req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message : "User logged out successfully",
            success : true
        })
    } catch (error) {
        console.log(error)
    }
}