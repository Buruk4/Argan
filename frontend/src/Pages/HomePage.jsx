import React from "react";
import Hero from "../component/Hero";
import Categories from "../component/Categories";
import Businesses from "../component/Businesses";
import Benefits from "../component/Benefits";
import Testimonial from "../component/Testimonial";
import CallToAction from "../component/CallToAction";
const HomePage = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Businesses />
      <Benefits />
      <Testimonial />
      <CallToAction />
    </>
  );
};

export default HomePage;
