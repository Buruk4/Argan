import React, { useState, useEffect } from "react";
import BusinessCard from "./businessCard"; // adjust path
import axios from "axios";

const ExplorePage = () => {
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [error, setError] = useState(null);
  const [maxDistance, setMaxDistance] = useState(5); // km
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = localStorage.getItem("token");

  const maxDistanceOption = [1, 2, 5, 10, 15, 221];
  // Fetch businesses automatically on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(lat, lon);
        try {
          const res = await axios.get(
            `http://localhost:5000/api/v1/bus/businesses?lat=${lat}&lon=${lon}&limit=20&radius=250000`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(res);
          if (res.data.success) {
            setAllBusinesses(res.data.businesses);
            setFilteredBusinesses(res.data.businesses);
          } else {
            setError(res.data.message);
          }
        } catch (err) {
          setError(err.message);
        }
      },
      (err) => setError(err.message)
    );
  }, []);

  // Apply filters whenever distance or category changes
  useEffect(() => {
    if (!allBusinesses) return;

    const filtered = allBusinesses.filter((b) => {
      const businessWithinDistance = b.distance <= maxDistance;
      const matchesCategory =
        !selectedCategory || b.category === selectedCategory;
      return businessWithinDistance && matchesCategory;
    });

    // Sort by nearest
    filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    // Update state
    setFilteredBusinesses(filtered);
  }, [allBusinesses, maxDistance, selectedCategory]);

  // Extract unique categories for filter dropdown

  const categories = [
    ...new Set(allBusinesses.map((b) => b.category).filter(Boolean)),
  ];

  return (
    <div className="p-5 mt-12 min-h-screen">
      {/* Page header */}
      <h1 className="text-2xl font-bold mb-5">Explore Nearby Businesses</h1>

      {/* Error message */}
      {error && <p className="text-red-500 mb-3">{error}</p>}

      {/* Filters */}

      <div className="flex items-center gap-5 mb-5">
        <label>
          How far you Can Go (km) :
          <select
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            {maxDistanceOption.map((value, index) => (
              <option value={value} key={index}>
                {value} km
              </option>
            ))}
          </select>
        </label>
        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="">All</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* Empty state */}
      {filteredBusinesses.length === 0 && allBusinesses.length > 0 && (
        <p className="mt-5 text-sm text-red-600">
          No businesses found for selected filters.
        </p>
      )}
      {/* Grid of BusinessCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(filteredBusinesses.length > 0
          ? filteredBusinesses
          : allBusinesses
        ).map((b, idx) => (
          <BusinessCard key={idx} business={b} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
