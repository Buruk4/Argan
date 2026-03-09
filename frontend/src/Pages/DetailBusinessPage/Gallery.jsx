import React, { useState } from "react";

const Gallery = ({ photos }) => {
  const [showAll, setShowAll] = useState(false);

  if (showAll) {
    return (
      <div className="absolute inset-0 bg-white z-50 p-8">
        <button
          onClick={() => setShowAll(false)}
          className="fixed top-4 right-4 bg-white p-2 rounded-full shadow-lg"
        >
          Close
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`gallery ${index}`}
              className="w-full h-auto rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-2 h-[400px] rounded-2xl overflow-hidden">
      <div className="col-span-2 row-span-2">
        <img
          src={photos[0]}
          alt="main"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setShowAll(true)}
        />
      </div>
      <img
        src={photos[1]}
        alt="thumb 1"
        className="w-full h-full object-cover cursor-pointer"
        onClick={() => setShowAll(true)}
      />
      <img
        src={photos[2]}
        alt="thumb 2"
        className="w-full h-full object-cover cursor-pointer"
        onClick={() => setShowAll(true)}
      />
      <img
        src={photos[3]}
        alt="thumb 3"
        className="w-full h-full object-cover cursor-pointer"
        onClick={() => setShowAll(true)}
      />
      <img
        src={photos[4]}
        alt="thumb 4"
        className="w-full h-full object-cover cursor-pointer"
        onClick={() => setShowAll(true)}
      />
      <button
        onClick={() => setShowAll(true)}
        className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md font-semibold"
      >
        Show all photos
      </button>
    </div>
  );
};

export default Gallery;
