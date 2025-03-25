import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilepic: newUser.profilepic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error6" });
  }
};

export const login = async (req, res) => {
  const {username, password} = req.body;
  try{
    const user = await User.findOne({username});

    if(!user){
      return res.status(404).json({message:"email incorrect"});
    }

    if(! await bcrypt.compare(password, user.password)){
      return res.status(404).json({message: "mot de passe incorrect"});
    }

    generateToken(user._id, res);
    
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      profilepic: user.profilePic,
    });
  } catch(error){
    console.log("erruer de login", error.message);
    res.status(500).json({message:"internal server error5"});
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"vous avez quittez le site"});
  } catch (error) {
    console.log("erruer de logout", error.message);
    res.status(500).json({message:"internal server error8"});
  }
};

export const authent = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error4" });
    console.log("Token:", token);
  }
};