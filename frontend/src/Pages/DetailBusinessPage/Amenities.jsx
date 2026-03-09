const Amenities = ({ amenities }) => (
  <div className="mt-6">
    <h2 className="text-2xl font-bold tracking-tight mb-4">What this place offers</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {amenities.map((am, i) => (
        <div key={i} className="flex items-center gap-3 text-lg text-gray-800">
          <span className="text-green-500">✓</span>
          <span>{am}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Amenities;
