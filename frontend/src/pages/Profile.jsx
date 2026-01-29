import React, { useEffect } from "react";
import useProfileStore from "../store/useProfileStore";
import { MapPin, Calendar, Clock } from "lucide-react";

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
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      <h3 className="text-xl font-semibold mb-6">My Bookings</h3>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings yet</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((b, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow">
            <img
              src={b.listing.image}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />

            <h4 className="font-semibold text-lg">{b.listing.city}</h4>

            <p className="text-sm text-gray-600 flex gap-1">
              <MapPin size={14} /> {b.listing.pincode}
            </p>

            <p className="text-sm mt-2 flex gap-2">
              <Calendar size={14} /> {b.date}
              <Clock size={14} /> {b.time}
            </p>

            {b.isStatic && (
              <span className="text-xs text-blue-600 font-semibold">
                Demo Booking
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;
