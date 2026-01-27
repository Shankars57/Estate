import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { data } from "../assets/assets";

const Explore = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-10"
      >
        Explore More Places
      </motion.h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <Link to={`/property/${item.id}`}>
              <img
                src={item.image}
                alt={item.city}
                className="h-36 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.city}</h3>

                <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                  <MapPin size={14} />
                  {item.pincode}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {item.areaType}
                  </span>

                  <span
                    className={`px-2 py-1 rounded-full ${
                      item.availability === "Available"
                        ? "bg-green-100 text-green-700"
                        : item.availability === "Limited"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.availability}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/properties"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View All Properties
        </Link>
      </div>
    </section>
  );
};

export default Explore;
