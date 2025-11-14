import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Resume from "./components/Resume.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Footer from "./components/Footer.jsx";
import ScrollParallaxBg from "./components/ScrollParallaxBg";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <>
    <ScrollParallaxBg />
      <Navbar />
      <main>
        <Hero />
        <Resume />
        <Services />
        <Portfolio />
        <Contact/>
      </main>
      <Footer />
    </>
  );
}
