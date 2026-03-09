import { Business } from "../Model/Businness.js";
import { v2 as cloudinary } from "cloudinary";

const registerBusinness = async (req, res) => {
  const ownerID = req.user?.id;

  // IMPORTANT: When sending JSON data within FormData as a string,
  // you need to parse it on the backend.
  let parsedBody;
  try {
    parsedBody = JSON.parse(req.body.data); // <--- This is the key change
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON data provided.",
    });
  }

  const {
    name,
    description,
    category,
    location,
    address,
    contact,
    openingHours,
    subscription,
    rating,
    amenities,
  } = parsedBody; // Destructure from the parsed JSON object

  try {
    if (!ownerID) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login to create a business.",
      });
    }

    // Basic validation for required fields
    // Ensure all these fields exist in the parsedBody
    if (!name || !description || !location || !address || !contact) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // You might also want to add more specific checks for nested objects
    if (
      !location.city ||
      !location.country ||
      !location.coordinates ||
      location.coordinates.length !== 2
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Location details (city, country, coordinates) are required and coordinates must be [longitude, latitude].",
      });
    }

    if (!contact.phone) {
      return res.status(400).json({
        success: false,
        message: "Contact phone number is required.",
      });
    }
    const duplicateBusiness = await Business.findOne({ ownerID, name });
    if (duplicateBusiness) {
      return res.status(409).json({
        success: false,
        message: "You already have a business with this name.",
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

    const business = new Business({
      ownerID,
      name,
      description,
      category,
      // Ensure the location object matches your schema, especially for GeoJSON
      location: {
        type: "Point",
        coordinates: location.coordinates,
        neighborhood: location.neighborhood,
        city: location.city,
        country: location.country,
      },
      address,
      contact,
      openingHours,
      subscription: subscription || "basic", // Default if not provided
      rating,
      photos: images_url,
      amenities,
    });

    await business.save();

    return res.status(201).send({
      success: true,
      message: "Business created successfully",
      business: {
        id: business._id,
        name: business.name,
        description: business.description,
        category: business.category,
        location: business.location,
        address: business.address,
        contact: business.contact,
        openingHours: business.openingHours,
        subscription: business.subscription,
        rating: business.rating,
        photos: business.photos,
        amenities: business.amenities,
      },
    });
  } catch (error) {
    console.error("Error registering business:", error);
    // Provide a more informative error message to the client
    return res.status(500).send({
      success: false,
      message:
        error.message ||
        "An unexpected error occurred during business registration.",
    });
  }
};

const getAllBusiness = async (req, res) => {
  try {
    const { lat, lon, limit = 10, page = 1, radius = 3000 } = req.query;

    // Make sure latitude & longitude are provided
    if (!lat || !lon) {
      return res.status(400).send({
        success: false,
        message: "User latitude (lat) and longitude (lon) are required",
      });
    }

    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    const businesses = await Business.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [parsedLon, parsedLat] },
          distanceField: "distance", // distance in meters
          spherical: true,
          maxDistance: parseInt(radius), // optional radius
        },
      },
      { $skip: skip },
      { $limit: parsedLimit },
      {
        $addFields: {
          distanceKm: { $divide: ["$distance", 1000] }, // new field in km
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          category: 1,
          location: 1,
          address: 1,
          contact: 1,
          openingHours: 1,
          rating: 1,
          photos: 1,
          amenities: 1,
          distance: { $divide: ["$distance", 1000] },
        },
      },
    ]);
    res.status(200).send({
      success: true,
      message: "Nearby Businesses",
      count: businesses.length,
      businesses,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getBusiness = async (req, res) => {
  const { id } = req.params;

  try {
    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).send({
        success: false,
        message: "Business not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Business found",
      business,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteBusiness = async (req, res) => {
  const { id } = req.params;
  try {
    const businessToBeDeleted = await Business.findByIdAndDelete(id);

    if (!businessToBeDeleted) {
      return res.status(404).send({
        success: false,
        message: "Business not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Business deleted successfully",
      business: businessToBeDeleted,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const updateBusiness = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedBusiness = await Business.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBusiness) {
      return res.status(404).send({
        success: false,
        message: "Business not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Business updated successfully",
      business: updatedBusiness,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
export {
  registerBusinness,
  getAllBusiness,
  getBusiness,
  deleteBusiness,
  updateBusiness,
};
