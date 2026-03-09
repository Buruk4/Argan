import { User } from "../Model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createToken from "../Utils/functions.js";

const register = async (req, res) => {
  const { name, email, password, phone, userType } = req.body;
  try {
    const userEmail = await User.findOne({ email });
    const userPhone = await User.findOne({ phone });

    if (userEmail) {
      return res
        .status(400)
        .send({ success: false, message: " this email  already exists" });
    }
    if (userPhone) {
      return res
        .status(400)
        .send({ success: false, message: "this phone already exists" });
    }

    // console.log(password, email, name, phone);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      userType: userType || "user",
    });

    const token = createToken(newUser);

    await newUser.save();
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found with this email" });
    }
    const isPasswordMathed = await bcrypt.compare(password, user.password);
    if (!isPasswordMathed) {
      return res.status(400).send({
        success: false,
        message: "invalid password ",
      });
    }

    const token = createToken(user);

    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
    });
  } catch (error) {
    console.log({ message: error.message });
    res.status(500).send({ success: false, message: error.message });
  }
};
export { register, login };
