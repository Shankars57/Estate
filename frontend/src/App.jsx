import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import AddListing from "./components/AddListing";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div className="">
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addListing" element={<AddListing />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/property/static/:id" element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
