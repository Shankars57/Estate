import React from "react";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import Explore from "../components/Explore";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProperties />
      <Explore />
    </div>
  );
};

export default Home;
