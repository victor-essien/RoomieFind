import { motion } from "framer-motion";
import { Users, ShieldCheck, MessageCircle, Search } from "lucide-react";

const FeatureCard = () => {
  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all"
      >
        <div
          className={`w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6`}
        >
          <Users size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Smart Matching Algo
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Our algorithm analyzes 20+ lifestyle points—from sleep schedules to
          cleanliness—to find your ideal match.
        </p>
      </motion.div>
      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all"
      >
        <div
          className={`w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6`}
        >
          <ShieldCheck size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Verified Students Only
        </h3>
        <p className="text-slate-600 leading-relaxed">
         We require phone and email verification so you know
          exactly who you're talking to.
        </p>
      </motion.div>
      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all"
      >
        <div
          className={`w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6`}
        >
          <MessageCircle size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">In-App Chat</h3>
        <p className="text-slate-600 leading-relaxed">
          Get to know potential roommates safely within the app before you
          decide to exchange numbers.
        </p>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all"
      >
        <div
          className={`w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6`}
        >
          <Search size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Lifestyle Filters
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Filter by budget, location, course of study, and hobbies to narrow
          down your search instantly.
        </p>
      </motion.div>
    </>
  );
};

export default FeatureCard;
