import { Review } from "../Model/Review.js";
import { v2 as cloudinary } from "cloudinary";
// post review
// get review belonging to a business
// delete review

const getReview = async (req, res) => {
  const BussinessId = req.params.BussinessId;

  try {
    const reviews = await Review.find({ BussinessID: BussinessId })
      .populate("userId", "name profilePic")
      .sort({ createdAt: -1 });

    if (!reviews) {
      return res.status(404).send({
        success: false,
        message: "No reviews found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const postReview = async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user?.id;
  const busId = req.params.businessId;

  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).send({
        message: "rating should be between 1 and 5 only.",
      });
    }

    if (!userId) {
      return res.status(400).send({
        message: "login to post review",
      });
    }

    let images_url = [];
    if (req.files && req.files.length > 0) {
      images_url = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
            folder: "business_photos",
          });
          return result.secure_url;
        })
      );
    }
    const newReviw = new Review({
      userID: userId,
      BusinessID: busId,
      rating,
      comment,
      photos: images_url,
    });

    await newReviw.save();
    return res.status(201).send({
      message: "review posted successfully",
      review: newReviw,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req.user.id;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(400).send({
        message: "review not found",
      });
    }

    if (!review.userID == userId) {
      return res.status(403).send({
        message: "Unauthorized action",
      });
    }

    await Review.findByIdAndDelete(reviewId);

    return res.status(200).send({
      message: "review deleted!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal server error",
    });
  }
};

export { postReview, getReview, deleteReview };
