import React, { useState, useEffect } from "react";
import axios from "axios";

const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const RegisterBusiness = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    neighborhood: "",
    city: "",
    country: "",
    address: "",
    contactPhone: "",
    contactEmail: "",
    website: "",
    openingHours: daysOfWeek.map((day) => ({
      day,
      opens: "",
      closes: "",
      closed: false,
    })),
    rating: "",
    photos: [],
    amenities: [""], // Initialize with one empty string for the first input
  });

  const [coordinates, setCoordinates] = useState([0, 0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setCoordinates([coords.longitude, coords.latitude]),
      (err) => {
        console.error("Geolocation error:", err);
        alert("Please allow location access to register your business.");
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpeningHoursChange = (index, field, value) => {
    const updated = [...formData.openingHours];
    updated[index][field] = value; // Directly set the value
    setFormData((prev) => ({ ...prev, openingHours: updated }));
  };

  const handleAmenityChange = (index, value) => {
    const updatedAmenities = [...formData.amenities];
    updatedAmenities[index] = value;
    setFormData((prev) => ({ ...prev, amenities: updatedAmenities }));
  };

  const addAmenityField = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, ""],
    }));
  };

  const removeAmenityField = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, photos: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in!");

    const businessData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      location: {
        neighborhood: formData.neighborhood,
        city: formData.city,
        country: formData.country,
        coordinates: coordinates, // Ensure coordinates are sent as an array
      },
      address: formData.address,
      contact: {
        phone: formData.contactPhone,
        email: formData.contactEmail,
        website: formData.website,
      },
      openingHours: formData.openingHours.map((entry) => ({
        ...entry,
        closed: Boolean(entry.closed), // Ensure boolean value
      })),
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
      amenities: formData.amenities.filter((a) => a.trim() !== ""), // Filter out empty strings
    };

    try {
      const formPayload = new FormData();
      // Append stringified JSON data under the 'data' field
      formPayload.append("data", JSON.stringify(businessData));
      // Append each photo file
      formData.photos.forEach((file) => {
        formPayload.append("photos", file);
      });

      const { data } = await axios.post(
        "http://localhost:5000/api/business/v1/register",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // This header is important for FormData
          },
        }
      );

      alert("Business registered successfully!");
      console.log(data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to register business.");
    }
  };

  console.log(coordinates);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Register Your Business
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Business Info</h3>
          <input
            name="name"
            placeholder="Business Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border p-2 mt-2 rounded"
          />
          <input
            name="category"
            placeholder="Category (e.g. Cafe, Hotel)"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border p-2 mt-2 rounded"
          />
        </div>

        {/* Address Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Address Info</h3>
          <input
            name="neighborhood"
            placeholder="Neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border p-2 mt-2 rounded"
          />
          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full border p-2 mt-2 rounded"
          />
          <input
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border p-2 mt-2 rounded"
          />
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
          <input
            name="contactPhone"
            placeholder="Phone Number"
            value={formData.contactPhone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="contactEmail"
            placeholder="Email"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full border p-2 mt-2 rounded"
          />
          <input
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border p-2 mt-2 rounded"
          />
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.openingHours.map((entry, index) => (
              <div key={entry.day} className="border p-4 rounded-lg shadow-sm">
                <p className="font-semibold capitalize text-gray-700 mb-2">
                  {entry.day}
                </p>
                {!entry.closed && ( // Only show time inputs if not closed
                  <>
                    <label htmlFor={`opens-${entry.day}`} className="sr-only">
                      Opens at {entry.day}
                    </label>
                    <input
                      id={`opens-${entry.day}`}
                      type="time"
                      value={entry.opens}
                      onChange={(e) =>
                        handleOpeningHoursChange(index, "opens", e.target.value)
                      }
                      className="w-full mt-1 border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <label htmlFor={`closes-${entry.day}`} className="sr-only">
                      Closes at {entry.day}
                    </label>
                    <input
                      id={`closes-${entry.day}`}
                      type="time"
                      value={entry.closes}
                      onChange={(e) =>
                        handleOpeningHoursChange(
                          index,
                          "closes",
                          e.target.value
                        )
                      }
                      className="w-full mt-2 border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </>
                )}
                <label className="text-sm mt-3 flex items-center">
                  <input
                    type="checkbox"
                    checked={entry.closed}
                    onChange={(e) =>
                      handleOpeningHoursChange(
                        index,
                        "closed",
                        e.target.checked
                      )
                    }
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />{" "}
                  Closed all day
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Media and Extras */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Media & Extras</h3>
          <label
            htmlFor="photos"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload Photos
          </label>
          <input
            name="photos"
            id="photos"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />

          <h4 className="text-md font-medium mb-2 mt-4">Amenities</h4>
          {formData.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                placeholder={`Amenity ${index + 1} (e.g. WiFi, Parking)`}
                value={amenity}
                onChange={(e) => handleAmenityChange(index, e.target.value)}
                className="w-full border p-2 rounded-md"
              />
              {formData.amenities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAmenityField(index)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addAmenityField}
            className="mt-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Add Another Amenity
          </button>

          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            step="0.1"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border p-2 mt-4 rounded-md"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
        >
          Register Business
        </button>
      </form>
    </div>
  );
};

export default RegisterBusiness;
