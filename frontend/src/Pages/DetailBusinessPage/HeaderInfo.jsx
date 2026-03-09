const HeaderInfo = ({ title, rating, location }) => {
  const formattedTitle = title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <div className="mb-4">
      <h1 className="text-4xl font-bold tracking-tight">{formattedTitle}</h1>
      <div className="flex items-center gap-3 mt-3 text-lg text-gray-700">
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.05 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
          </svg>
          {rating?.toFixed(1)}
        </span>
        <span className="text-gray-400">•</span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {location.neighborhood}, {location.city}, {location.country}
        </span>
      </div>
    </div>
  );
};

export default HeaderInfo;
