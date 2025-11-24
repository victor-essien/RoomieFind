import Navbar from "./components/Landing/Navbar";
import Hero from "./components/Landing/Hero";
import Features from "./components/Landing/Features";
import Testimonials from "./components/Landing/Testimonials";
import HowItWorks from "./components/Landing/HowItWorks";
import CTA from "./components/Landing/CTA";
import Footer from "./components/Landing/Footer";

const LandingPage = () => {
  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
