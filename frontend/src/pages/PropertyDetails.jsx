import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft } from "lucide-react";
import BookVisitModal from "../components/BookVisitModal";
import useListingStore from "../store/useListingStore";
import { data as staticListings } from "../assets/assets";

const PropertyDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isStatic = location.pathname.includes("/static/");
  const { fetchListingById } = useListingStore();

  const [property, setProperty] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      if (isStatic) {
        const found = staticListings.find((item) => item.id === Number(id));
        setProperty(found);
      } else {
        const data = await fetchListingById(id);
        setProperty(data);
      }
    };

    loadProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Property not found
      </div>
    );
  }

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-10"
      >
        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={property.image}
            alt={property.city}
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold ${
                property.availability === "Available"
                  ? "bg-green-600 text-white"
                  : property.availability === "Limited"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-600 text-white"
              }`}
            >
              {property.availability}
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-gray-800 text-white">
              {property.areaType}
            </span>

            {isStatic && (
              <span className="px-3 py-1 text-xs rounded-full bg-blue-600 text-white">
                Demo
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{property.city}</h1>

          <p className="text-gray-600 flex items-center gap-1 mb-4">
            <MapPin size={16} />
            {property.pincode}
          </p>

          <p className="text-gray-700 mb-6">{property.status}</p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">Price / sq.ft</p>
              <p>₹{property.avgPricePerSqFt}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">Rental Yield</p>
              <p>{property.rentalYield}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">Luxury Rent</p>
              <p>{property.luxuryRentRange}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">Contact</p>
              <p>{property.contact}</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">{property.directions}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {property.hotspots.map((spot) => (
              <span
                key={spot}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
              >
                {spot}
              </span>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Book a Visit
          </button>
        </div>
      </motion.div>

      <BookVisitModal
        isOpen={open}
        onClose={() => setOpen(false)}
        property={property}
      />
    </section>
  );
};

export default PropertyDetails;
