import { useEffect, useState } from "react";
import Gallery from "./Gallery";
import HeaderInfo from "./HeaderInfo";
import axios from "axios";
import { useParams } from "react-router-dom";

import Description from "./Description";
import Amenities from "./Amenities";
import OpeningHours from "./OpeningHours";
// import LocationMap from "./components/LocationMap";
// import ReserveBox from "./components/ReserveBox";
// import HostSection from "./components/HostSection";
// import Reviews from "./components/Reviews";

const BusinessDetailPage = () => {
  const [business, setBusiness] = useState(null);

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/bus/business/${id}`
        );
        console.log(res);
        const data = await res.data;
        setBusiness(data.business);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBusiness();
  }, [id]);

  console.log(business);
  if (!business) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[80px]">
      <Gallery photos={business.photos} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 space-y-8">
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <HeaderInfo
              title={business.name}
              rating={business.rating}
              location={business.location}
            />
          </div>

          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <Description description={business.description} />
          </div>

          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <Amenities amenities={business.amenities} />
          </div>

          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <OpeningHours hours={business.openingHours} />
          </div>

          {/* Uncomment and style these as needed */}
          {/* <LocationMap location={business.location} /> */}
          {/* <HostSection ownerID={business.ownerID} /> */}
          {/* <Reviews businessId={id} /> */}
        </div>

        <div className="md:col-span-1">
          {/* <ReserveBox business={business} /> */}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailPage;
