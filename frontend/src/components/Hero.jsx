import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useSearchStore from "../store/useSearchStore";

const Hero = () => {
  const navigate = useNavigate();
  const { query, setQuery } = useSearchStore();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate("/properties");
  };

  return (
    <section
      className="h-[90vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c)",
      }}
    >
      <div className="bg-black/60 w-full h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl px-8 text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Find Your <span className="text-blue-400">Dream Home</span>
          </h1>
          <p className="text-lg mb-8 text-gray-200">
            Explore verified properties, schedule visits instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 bg-white/90 p-3 rounded-xl">
            <input
              type="text"
              placeholder="Search by city, pincode, area..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-800 outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delay: 0.4 },
              },
            }}
            className="flex gap-10 mt-10 text-sm"
          >
            {" "}
            {[
              { value: "1,200+", label: "Properties" },
              { value: "50+", label: "Cities" },
              { value: "5k+", label: "Happy Users" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {" "}
                <p className="text-2xl font-bold">{stat.value}</p>{" "}
                <p className="text-gray-300">{stat.label}</p>{" "}
              </motion.div>
            ))}{" "}
          </motion.div>{" "}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
