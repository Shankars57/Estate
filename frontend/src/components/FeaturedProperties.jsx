import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { data } from "../assets/assets";

const FeaturedProperties = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredData = data
    .slice(0, 6)
    .filter(
      (item) =>
        item.city.toLowerCase().includes(query.toLowerCase()) ||
        item.pincode.includes(query) ||
        item.areaType.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-10 text-center"
      >
        Featured Markets in Andhra Pradesh
      </motion.h2>

      {/* Search */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="flex flex-col sm:flex-row gap-3 items-center bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg max-w-3xl mx-auto mb-12"
      >
        <input
          type="text"
          placeholder="Search by city, pincode, or area type..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
        />
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => navigate(`/property/static/${item.id}`)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.city}
                className="h-48 w-full object-cover"
              />

              <span
                className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold ${
                  item.availability === "Available"
                    ? "bg-green-600 text-white"
                    : item.availability === "Limited"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {item.availability}
              </span>

              <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                {item.areaType}
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{item.city}</h3>

              <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                <MapPin size={14} />
                {item.pincode}
              </p>

              <p className="text-sm text-gray-700 mb-4">{item.status}</p>

              <div className="text-sm space-y-1">
                <p>
                  <span className="font-semibold">Price:</span> ₹
                  {item.avgPricePerSqFt}/sq.ft
                </p>
                <p>
                  <span className="font-semibold">Yield:</span>{" "}
                  {item.rentalYield}
                </p>
                <p>
                  <span className="font-semibold">Luxury Rent:</span>{" "}
                  {item.luxuryRentRange}
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                {item.directions}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(item.hotspots || []).map((spot) => (
                  <span
                    key={spot}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                  >
                    {spot}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-12">
          No matching properties found.
        </p>
      )}
    </section>
  );
};

export default FeaturedProperties;
