import cloudinaryConfig from "../config/cloudinary.js";
import { User } from "../Model/User.js";
import { v2 as cloudinary } from "cloudinary";
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.FindById(id);

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "internal error",
      });

      res.status(200).sned({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred",
    });
  }
};

const updateUser = async () => {
  res.send("not builted");
};
const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    let profileImageUrl = "";

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "profile images",
    });

    profileImageUrl = result.secure_url;

    // fs.unlinkSync(req.file.path);

    const userId = req.user.id;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profileImg: profileImageUrl },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      profileUrl: profileImageUrl,
      user: updateUser,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while uploading profile picture",
    });
  }
};
const deleteUser = async () => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);

    if (deleteUser) {
      return res.status(404).send({
        success: true,
        message: "something error",
      });

      res.status(200).send({
        success: true,
        message: "successfull",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const addToFavorite = async (req, res) => {
  const { businessId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("user not logged in");
    }

    const index = user.favoriteBussiness.indexOf(businessId);

    if (index == -1) {
      user.favoriteBussiness.push(businessId);
    } else {
      user.favoriteBussiness.splice(index, 1);
    }

    await user.save();
    res
      .status(200)
      .send({ success: true, favoriteBussiness: user.favoriteBussiness });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export { getUser, uploadProfilePic, deleteUser, addToFavorite };
