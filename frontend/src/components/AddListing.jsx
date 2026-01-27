import React from "react";
import { motion } from "framer-motion";
import { ImagePlus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useListingStore from "../store/useListingStore";
import toast from "react-hot-toast";

const AddListing = () => {
  const navigate = useNavigate();
  const { addListing, loading } = useListingStore();
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const [form, setForm] = React.useState({
    city: "",
    avgPricePerSqFt: "",
    rentalYield: "",
    luxuryRentRange: "",
    hotspots: "",
    status: "",
    pincode: "",
    directions: "",
    availability: "Available",
    areaType: "Urban",
    contact: "",
  });

  const [imageFile, setImageFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));

    try {
      await addListing(formData);
      navigate("/properties");
    } catch {
      // toast already handled in store
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-10 left-10 text-blue-700 font-medium"
      >
        ← Back
      </button>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Property Listing
        </h2>

        {/* Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Property Image
          </label>

          {!preview ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-48 cursor-pointer text-gray-500 hover:border-blue-500 transition">
              <ImagePlus size={40} />
              <span className="mt-2 text-sm">Click to upload image</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          ) : (
            <div className="relative">
              <img src={preview} alt="Preview" className="h-48 w-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ["city", "City"],
            ["avgPricePerSqFt", "Avg Price per Sq.ft"],
            ["rentalYield", "Rental Yield"],
            ["luxuryRentRange", "Luxury Rent Range"],
            ["pincode", "Pincode"],
            ["contact", "Contact Number"],
            ["directions", "Directions / Connectivity"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              placeholder={placeholder}
              required
              onChange={handleChange}
              className="input"
            />
          ))}
        </div>

        <textarea
          name="status"
          placeholder="Market Status / Description"
          required
          onChange={handleChange}
          className="input mt-4 h-24"
        />

        <textarea
          name="hotspots"
          placeholder="Hotspots (comma separated)"
          required
          onChange={handleChange}
          className="input mt-4 h-20"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <select name="availability" onChange={handleChange} className="input">
            <option>Available</option>
            <option>Limited</option>
            <option>Speculative</option>
          </select>
          <select name="areaType" onChange={handleChange} className="input">
            <option>Urban</option>
            <option>Semi-Urban</option>
            <option>Rural</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Uploading..." : "Add Listing"}
        </button>
      </motion.form>
    </section>
  );
};

export default AddListing;
