import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
// --- Components ---


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
}

export default LandingPage