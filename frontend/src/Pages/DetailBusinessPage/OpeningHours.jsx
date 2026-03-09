const daysMap = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

const OpeningHours = ({ hours }) => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold tracking-tight mb-4">Opening Hours</h2>

    <div className="space-y-3 text-lg">
      {hours.map((h, i) => (
        <div key={i} className="flex items-center">
          <span className="w-28 font-medium text-gray-800">{daysMap[h.day]}</span>
          <span className="flex-1 border-b-2 border-dotted border-gray-300 mx-4"></span>
          {h.closed ? (
            <span className="font-semibold text-red-600">Closed</span>
          ) : (
            <span className="font-mono tracking-wider text-gray-800">
              {h.opens} - {h.closes}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default OpeningHours;
