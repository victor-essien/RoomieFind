import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why students love RoomieFind
          </h2>
          <p className="text-lg text-slate-600">
            We've stripped away the awkwardness of finding a roommate and
            replaced it with data-driven compatibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard />
        </div>
      </div>
    </section>
  );
};

export default Features;
