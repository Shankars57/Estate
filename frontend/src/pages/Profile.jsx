import React, { useEffect } from "react";
import useProfileStore from "../store/useProfileStore";
import { MapPin } from "lucide-react";

const Profile = () => {
  const { user, bookings, fetchProfile, fetchBookings, loading } =
    useProfileStore();

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      {/* User */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {/* Bookings */}
      <h3 className="text-xl font-semibold mb-4">My Bookings</h3>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings yet.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <img
              src={b.listing.image}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />

            <h4 className="font-semibold text-lg">
              {b.listing.city}
            </h4>

            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin size={14} />
              {b.listing.pincode}
            </p>

            <p className="text-sm mt-2">
              📅 {b.date} ⏰ {b.time}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;
