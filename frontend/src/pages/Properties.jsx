import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useListingStore from "../store/useListingStore";
import useSearchStore from "../store/useSearchStore";
import { data as staticListings } from "../assets/assets";

const Properties = () => {
  const navigate = useNavigate();

  const { listings: dbListings, fetchListings, loading } = useListingStore();
  const { query, setQuery } = useSearchStore();

  useEffect(() => {
    fetchListings();
  }, []);

  // 🔀 Combine static + DB listings
  const combinedListings = useMemo(() => {
    const db = dbListings.map((item) => ({
      ...item,
      uiId: item._id,
      source: "db",
    }));

    const staticData = staticListings.map((item) => ({
      ...item,
      uiId: item.id,
      source: "static",
    }));

    return [...staticData, ...db];
  }, [dbListings]);

  // 🔍 SEARCH LOGIC
  const filteredData = combinedListings.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.city.toLowerCase().includes(q) ||
      item.pincode.includes(q) ||
      item.areaType.toLowerCase().includes(q)
    );
  });

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        All Properties
      </motion.h1>

      {/* SEARCH BAR (SYNCED WITH HERO) */}
      <div className="flex gap-3 max-w-3xl mx-auto mb-10">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city, pincode, or area type..."
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      {/* ADD LISTING */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/addListing")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Add Listing
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-center">Loading...</p>}

      {/* LISTINGS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((item) => (
          <motion.div
            key={`${item.source}-${item.uiId}`}
            onClick={() =>
              item.source === "db"
                ? navigate(`/property/${item.uiId}`)
                : navigate(`/property/static/${item.uiId}`)
            }
            whileHover={{ y: -6 }}
            className="bg-white rounded-xl shadow cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.city}
              className="h-52 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl font-semibold">{item.city}</h2>

              <p className="text-sm text-gray-600 flex gap-1">
                <MapPin size={14} /> {item.pincode}
              </p>

              <p className="text-sm mt-2">{item.status}</p>

              <p className="mt-2 text-sm">
                <b>₹{item.avgPricePerSqFt}</b> / sq.ft
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {!loading && filteredData.length === 0 && (
        <p className="text-center mt-12 text-gray-500">
          No matching properties found
        </p>
      )}
    </section>
  );
};

export default Properties;
